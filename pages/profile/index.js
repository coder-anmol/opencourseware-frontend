import {
    Heading,
    Box,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    HStack,
    Textarea,
    Avatar,
    AvatarBadge,
    Icon,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useState, useRef } from "react";
import Button from "@/components/Button";
import useStore from "store";
import { FaPen } from "react-icons/fa";

const Profile = () => {
    const userData = useStore((state) => state.userData);
    const setUserData = useStore((state) => state.setUserData);
    const [image, setImage] = useState({
        url: userData.profile_image,
        id: userData.profile_image_public_id,
    });
    const [imageFile, setImageFile] = useState(null);

    // creating ref
    const fileInput = useRef(null);

    const initialFields = {
        name: userData.name,
        bio: userData.bio,
    };

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
            bio: values.bio,
            profile_image: image.url,
            profile_image_public_id: image.id,
        };

        Axios.patch("users/current-user", formData)
            .then((res) => {
                Axios.get("users/current-user").then((res) => {
                    setUserData(res.data);
                    swal({
                        title: "Update Successfull",
                        icon: "success",
                        text: "Your profile is changed ",
                        type: "success",
                    });
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                    actions.setSubmitting(false);
                });
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Updates Failed",
                    text: "Unable to save profile",
                });
                actions.setSubmitting(false);
            });
    };

    const handleChangedImage = (values, actions) => {
        const data = new FormData();
        data.append("image", imageFile);
        data.append("folder", "uploads");

        if (image.id) {
            data.append("public_id", image.id);
        }

        // sending upload request
        Axios.post("image-upload/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                // patch user now
                const formData = {
                    name: values.name,
                    bio: values.bio,
                    profile_image: res.data.image_url,
                    profile_image_public_id: res.data.public_id,
                };

                Axios.patch("users/current-user", formData)
                    .then((res) => {
                        Axios.get("users/current-user").then((res) => {
                            setUserData(res.data);
                            setImage({
                                url: res.data.profile_image,
                                id: res.data.profile_image_public_id,
                            });
                            swal({
                                title: "Update Successfull",
                                icon: "success",
                                text: "Your profile is changed ",
                                type: "success",
                            });

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                            actions.setSubmitting(false);
                        });
                    })
                    .catch((err) => {
                        swal({
                            icon: "error",
                            title: "Updates Failed",
                            text: "Unable to save profile",
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
        if (image.url == userData.profile_image) {
            handleSameImage(values, actions);
        }
        // image was changed
        else {
            handleChangedImage(values, actions);
        }
    };

    return (
        <Box>
            <Box>
                <Formik
                    initialValues={initialFields}
                    onSubmit={(values, actions) => {
                        // submit action
                        // setTimeout(() => {
                        //     console.log(values);
                        //     actions.resetForm(initialFields);
                        // }, 1000);
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

                            <HStack justify={"end"}>
                                <Button
                                    mt={4}
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    Save Changes
                                </Button>
                            </HStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

Profile.layout = "profile";
export default Profile;
