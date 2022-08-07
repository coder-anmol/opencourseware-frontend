import {
    Heading,
    Box,
    Input,
    RadioGroup,
    FormLabel,
    FormControl,
    FormErrorMessage,
    HStack,
    Textarea,
    Avatar,
    AvatarBadge,
    Icon,
} from "@chakra-ui/react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Formik, Form, Field } from "formik";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { FaPen } from "react-icons/fa";
import { formatRole } from "utils/tools";
import validator from "validator";

const EditId = () => {
    const [loading, setLoading] = useState(true);
    const [initialFields, setInitialFields] = useState({});
    const [image, setImage] = useState({
        id: "",
        url: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const router = useRouter();

    const fileInput = useRef(null);

    const editProfileHandler = () => {
        fileInput.current.click();
    };

    async function selectFile(e) {
        const file = e.target.files[0];

        //   if file does not exists
        if (!file) {
            return;
        }

        // validations: I may change them in future for now, its ok
        const pattern = new RegExp(/(jpg|jpeg|png)/);
        if (!pattern.test(file.type)) {
            swal({
                icon: "error",
                title: "Validation Error",
                text: "Only png, jpg, jpeg files are allowed",
                showCloseButton: true,
                showConfirmButton: false,
            });
            return;
        }

        // mb -> bytes
        const converter = (sizeInMb) => sizeInMb * 1024 * 1024;

        // file should be less than 2 mb
        if (!(file.size < converter(2))) {
            swal({
                icon: "error",
                title: "Validation Error",
                text: "Image size should be less than 2 MB",
                showCloseButton: true,
                showConfirmButton: false,
            });
            return;
        }

        //   file size should be greater than 50 Kb
        if (!(file.size > converter(0.048828125))) {
            swal({
                icon: "error",
                title: "Validation Error",
                text: "Image size should be greater than 50KB",
                showCloseButton: true,
                showConfirmButton: false,
            });
            return;
        }

        const readData = (f) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(f);
            });

        const data = await readData(file);

        setImage({ ...image, url: data });
        setImageFile(file);
    }

    const validateName = (value) => {
        let error;
        if (value.length >= 3) {
            if (value.length <= 50) {
                error = "";
            } else {
                error = "Name should not be greater than 50 characters";
            }
        } else {
            error = "Name should be at least 3 characters";
        }
        return error;
    };

    const validateEmail = (value) => {
        let error;
        if (validator.isEmail(value)) {
            error = "";
        } else {
            error = "Email is not valid";
        }
        return error;
    };

    const validateBio = (value) => {
        let error;
        if (value.length <= 300) {
            error = "";
        } else {
            error = "Bio cannot exceed 300 characters";
        }
        return error;
    };

    const handleSameImage = (values, actions) => {
        const formData = {
            name: values.name,
            email: values.email,
            bio: values.bio,
            profile_image: values.profile_image,
            profile_image_public_id: values.profile_image_public_id,
            is_teacher: values.role == "Teacher" ? true : false,
            is_student: values.role == "Student" ? true : false,
            is_admin: values.role == "Admin" ? true : false,
        };

        Axios.patch(`users/${values.id}/`, formData)
            .then((res) => {
                swal({
                    title: "Update Successfull",
                    icon: "success",
                    text: "User profile is changed ",
                    type: "success",
                });
                router.push("/admin/users");
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Updates Failed",
                    text: "Unable to update profile",
                });
                actions.setSubmitting(false);
            });
    };

    const handleChangedImage = (values, actions) => {
        const data = new FormData();
        data.append("image", imageFile);
        data.append("folder", "uploads");

        if (image.id) {
            data.append("public_id", values.profile_image_public_id);
        }

        // sending upload request
        Axios.post("image-upload/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                const formData = {
                    name: values.name,
                    email: values.email,
                    bio: values.bio,
                    profile_image: res.data.image_url,
                    profile_image_public_id: res.data.public_id,
                    is_teacher: values.role == "Teacher" ? true : false,
                    is_student: values.role == "Student" ? true : false,
                    is_admin: values.role == "Admin" ? true : false,
                };

                Axios.patch(`users/${values.id}/`, formData)
                    .then((res) => {
                        swal({
                            title: "Update Successfull",
                            icon: "success",
                            text: "User profile is changed ",
                            type: "success",
                        });
                        router.push("/admin/users");
                    })
                    .catch((err) => {
                        swal({
                            icon: "error",
                            title: "Updates Failed",
                            text: "Unable to update profile",
                        });
                        actions.setSubmitting(false);
                    });
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Upload Failed",
                    text: "Unable to upload image",
                    showCloseButton: true,
                    showConfirmButton: false,
                });
                actions.setSubmitting(false);
            });
    };

    const updateProfile = (values, actions) => {
        // image was same
        if (!imageFile) {
            handleSameImage(values, actions);
        }
        // image was changed
        else {
            handleChangedImage(values, actions);
        }
    };

    useEffect(() => {
        if (router.query.id) {
            Axios.get(`users/${router.query.id}`)
                .then((res) => {
                    const {
                        id,
                        name,
                        email,
                        bio,
                        is_admin,
                        is_student,
                        is_teacher,
                        profile_image,
                        profile_image_public_id,
                    } = res.data;

                    const initialValues = {
                        id,
                        name,
                        email,
                        bio,
                        role: formatRole(is_student, is_teacher, is_admin),
                        profile_image,
                        profile_image_public_id,
                    };

                    setInitialFields(initialValues);
                    setImage({
                        url: profile_image,
                        id: profile_image_public_id,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: "Unable to fetch user's data",
                    });
                    router.push("/admin/users");
                });
        }
    }, [router.query.id]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <Formik
                    initialValues={initialFields}
                    onSubmit={(values, actions) => {
                        updateProfile(values, actions);
                    }}
                >
                    {(props) => (
                        <Form id="edit-profile">
                            <Heading fontSize={"3xl"} mb={6}>
                                Edit Profile
                            </Heading>

                            {/* Profile Image */}
                            <HStack
                                mb={8}
                                justify={{ base: "center", lg: "left" }}
                            >
                                <Avatar
                                    name={initialFields.name}
                                    src={image.url}
                                    size={"2xl"}
                                    shadow={"xl"}
                                >
                                    <AvatarBadge
                                        borderColor="papayawhip"
                                        bg="danger"
                                        boxSize="0.8em"
                                        border={"4px"}
                                        right={2}
                                        bottom={2}
                                        cursor={"pointer"}
                                        onClick={editProfileHandler}
                                    >
                                        <Icon
                                            as={FaPen}
                                            fontSize={"1rem"}
                                            color={"white"}
                                        />
                                    </AvatarBadge>
                                </Avatar>
                                {/* file upload field */}
                                <Box>
                                    <Input
                                        ref={fileInput}
                                        type={"file"}
                                        display={"none"}
                                        accept="image/jpeg,image/jpg,image/png"
                                        onChange={(e) => {
                                            selectFile(e);
                                        }}
                                    />
                                </Box>
                            </HStack>

                            {/*name */}
                            <Field name="name" validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.name &&
                                            form.touched.name
                                        }
                                        mb={3}
                                    >
                                        <FormLabel
                                            fontWeight={"medium"}
                                            fontSize={"lg"}
                                            htmlFor="email"
                                        >
                                            Name{" "}
                                            <span
                                                style={{
                                                    color: "var(--chakra-colors-danger)",
                                                }}
                                            >
                                                *
                                            </span>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            placeholder="Name"
                                            size={"lg"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                        />
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.name}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/*email */}
                            <Field name="email" validate={validateEmail}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.email &&
                                            form.touched.email
                                        }
                                        mb={3}
                                    >
                                        <FormLabel
                                            fontWeight={"medium"}
                                            fontSize={"lg"}
                                            htmlFor="email"
                                        >
                                            Email{" "}
                                            <span
                                                style={{
                                                    color: "var(--chakra-colors-danger)",
                                                }}
                                            >
                                                *
                                            </span>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            placeholder="Email"
                                            size={"lg"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                        />
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.email}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/*bio */}
                            <Field name="bio" validate={validateBio}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.bio && form.touched.bio
                                        }
                                        mb={3}
                                    >
                                        <FormLabel
                                            fontWeight={"medium"}
                                            fontSize={"lg"}
                                            htmlFor="bio"
                                        >
                                            Bio{" "}
                                        </FormLabel>
                                        <Textarea
                                            {...field}
                                            id="bio"
                                            placeholder="Bio"
                                            size={"lg"}
                                            rows={"6"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                        />
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.bio}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/* role */}
                            <FormControl mb={6}>
                                <FormLabel
                                    fontWeight={"medium"}
                                    fontSize={"lg"}
                                    htmlFor="name"
                                >
                                    Role{" "}
                                    <span
                                        style={{
                                            color: "var(--chakra-colors-danger)",
                                        }}
                                    >
                                        *
                                    </span>
                                </FormLabel>
                                <RadioGroup
                                    fontSize={"lg"}
                                    __css={{
                                        "& label": {
                                            cursor: "pointer",
                                            "& input[type=radio]": {
                                                transform: "scale(1.5)",
                                                marginRight: "0.5rem",
                                                marginLeft: "0.2rem",
                                            },
                                        },
                                    }}
                                >
                                    <HStack gap={4}>
                                        <label>
                                            <Field
                                                type="radio"
                                                name="role"
                                                value="Student"
                                            />
                                            Student
                                        </label>
                                        <label>
                                            <Field
                                                type="radio"
                                                name="role"
                                                value="Teacher"
                                            />
                                            Teacher
                                        </label>
                                        <label>
                                            <Field
                                                type="radio"
                                                name="role"
                                                value="Admin"
                                            />
                                            Admin
                                        </label>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>

                            <HStack justify={"end"}>
                                <Button
                                    mt={4}
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    Update User
                                </Button>
                            </HStack>
                        </Form>
                    )}
                </Formik>
            </AdminWrapper>
        </>
    );
};

EditId.layout = "admin";
export default EditId;
