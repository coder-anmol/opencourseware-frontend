import AdminWrapper from "@/components/Admin/AdminWrapper";
import {
    Heading,
    Box,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Select,
    HStack,
    AspectRatio,
    Image,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import Button from "@/components/Button";
import Axios from "utils/fetcher";
import { useRouter } from "next/router";
import useStore from "store";
import AdminLoader from "@/components/Admin/AdminLoader";

function AddUser() {
    const userData = useStore((state) => state.userData);
    const [coverImage, setCoverImage] = useState(null);
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const imageUpload = useRef();
    const router = useRouter();

    const initialFields = {
        name: "",
        description: "",
        category: 0,
        cover: "",
    };

    const createCourse = (values, actions) => {
        const data = new FormData();
        data.append("image", coverImage);
        data.append("folder", "uploads");

        // sending upload request
        Axios.post("image-upload/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                const formData = {
                    course_name: values.name,
                    category: values.category,
                    description: values.description,
                    cover_image: res.data.image_url,
                    cover_image_public_id: res.data.public_id,
                    teacher: userData.id,
                    course_status: "drafted",
                };

                Axios.post(`course/`, formData)
                    .then((res) => {
                        swal({
                            title: "Action Successfull",
                            icon: "success",
                            text: "Course created successfully",
                            type: "success",
                        });
                        router.push("/admin/courses");
                    })
                    .catch((err) => {
                        console.log(err);
                        swal({
                            icon: "error",
                            title: "Action Failed",
                            text: "Unable to create course",
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

    async function selectFile(file) {
        //   if file does not exists
        if (!file) {
            setCoverImage(null);
            return "File does not exists";
        }

        // validations: I may change them in future for now, its ok
        const pattern = new RegExp(/(jpg|jpeg|png)/);
        if (!pattern.test(file.type)) {
            setCoverImage(null);
            return "Only png, jpg, jpeg files are allowed";
        }

        // mb -> bytes
        const converter = (sizeInMb) => sizeInMb * 1024 * 1024;

        // file should be less than 2 mb
        if (!(file.size < converter(2))) {
            setCoverImage(null);
            return "Image size should be less than 2 MB";
        }

        //   file size should be greater than 50 Kb
        if (!(file.size > converter(0.048828125))) {
            setCoverImage(null);
            return "Image size should be greater than 50KB";
        }

        const readData = (f) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(f);
            });

        const data = await readData(file);
        setImage(data);
        setCoverImage(file);

        return "";
    }

    const validateName = (value) => {
        let error;
        if (value.length >= 10) {
            if (value.length <= 80) {
                error = "";
            } else {
                error = "Course name should not be greater than 80 characters";
            }
        } else {
            error = "Course name should be at least 10 characters";
        }
        return error;
    };

    const validateDescription = (value) => {
        let error;
        if (value.length >= 30) {
            if (value.length <= 100) {
                error = "";
            } else {
                error =
                    "Course description should not be greater than 100 characters";
            }
        } else {
            error = "Course description should be at least 30 characters";
        }
        return error;
    };

    const validateCategory = (value) => {
        let error;
        if (value) {
            error = "";
        } else {
            error = "Select a category";
        }
        return error;
    };

    const validateCover = async (value) => {
        let error;
        if (value) {
            error = await selectFile(imageUpload.current.files[0]);
        } else {
            error = "Select a cover image";
        }
        return error;
    };

    useEffect(() => {
        Axios.get("category/all").then((res) => {
            setCategories(res.data.results);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <Box>
                    <Heading>Add Course</Heading>
                </Box>
                <Box pt={8}>
                    <Formik
                        initialValues={initialFields}
                        onSubmit={(values, actions) => {
                            createCourse(values, actions);
                        }}
                    >
                        {(props) => (
                            <Form id="add-course">
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
                                                Course Name{" "}
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

                                {/*description*/}
                                <Field
                                    name="description"
                                    validate={validateDescription}
                                >
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.description &&
                                                form.touched.description
                                            }
                                            mb={3}
                                        >
                                            <FormLabel
                                                fontWeight={"medium"}
                                                fontSize={"lg"}
                                                htmlFor="email"
                                            >
                                                Description{" "}
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
                                                id="description"
                                                placeholder="Description"
                                                size={"lg"}
                                                focusBorderColor={"primary"}
                                                errorBorderColor={"danger"}
                                            />
                                            <FormErrorMessage color={"danger"}>
                                                {form.errors.description}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                {/*category */}
                                <Field
                                    name="category"
                                    validate={validateCategory}
                                >
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.category &&
                                                form.touched.category
                                            }
                                            mb={3}
                                        >
                                            <FormLabel
                                                fontWeight={"medium"}
                                                fontSize={"lg"}
                                                htmlFor="email"
                                            >
                                                Category{" "}
                                                <span
                                                    style={{
                                                        color: "var(--chakra-colors-danger)",
                                                    }}
                                                >
                                                    *
                                                </span>
                                            </FormLabel>
                                            <Box w={"15rem"}>
                                                <Select
                                                    id="category"
                                                    {...field}
                                                    variant="filled"
                                                    placeholder="Default"
                                                    fontSize={"lg"}
                                                >
                                                    {categories.map(
                                                        (category) => {
                                                            const {
                                                                id,
                                                                category_name,
                                                            } = category;
                                                            return (
                                                                <option
                                                                    key={id}
                                                                    value={id}
                                                                >
                                                                    {
                                                                        category_name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Select>
                                            </Box>
                                            <FormErrorMessage color={"danger"}>
                                                {form.errors.category}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                {/*cover */}
                                <Field name="cover" validate={validateCover}>
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.cover &&
                                                form.touched.cover
                                            }
                                            mb={3}
                                        >
                                            <FormLabel
                                                fontWeight={"medium"}
                                                fontSize={"lg"}
                                                htmlFor="email"
                                            >
                                                Course Cover{" "}
                                                <span
                                                    style={{
                                                        color: "var(--chakra-colors-danger)",
                                                    }}
                                                >
                                                    *
                                                </span>
                                            </FormLabel>
                                            {coverImage && (
                                                <Box pb={"4"}>
                                                    <AspectRatio>
                                                        <Image
                                                            alt="Preview Cover Image"
                                                            src={image}
                                                            rounded={"xl"}
                                                            shadow={"lg"}
                                                        />
                                                    </AspectRatio>
                                                </Box>
                                            )}
                                            <Input
                                                {...field}
                                                ref={imageUpload}
                                                type={"file"}
                                                size={"lg"}
                                                variant={"unstyled"}
                                            />
                                            <FormErrorMessage color={"danger"}>
                                                {form.errors.cover}
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
                                        Create Course
                                    </Button>
                                </HStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </AdminWrapper>
        </>
    );
}

AddUser.layout = "admin";
export default AddUser;
