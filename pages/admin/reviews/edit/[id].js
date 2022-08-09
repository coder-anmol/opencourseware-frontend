import {
    Heading,
    Box,
    Input,
    FormLabel,
    FormControl,
    Select,
    FormErrorMessage,
    HStack,
    AspectRatio,
    Image,
} from "@chakra-ui/react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Formik, Form, Field } from "formik";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const EditId = () => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(true);
    const [coverImage, setCoverImage] = useState(null);
    const [image, setImage] = useState("");
    const router = useRouter();
    const imageUpload = useRef(null);

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

        // old image exists
        if (course.cover_image) {
            // unchanged image
            if (!value) {
                error = "";
            } else {
                // changed image
                if (value) {
                    error = await selectFile(imageUpload.current.files[0]);
                } else {
                    error = "Select a cover image";
                }
            }
        }

        return error;
    };

    const updateCourse = (values, actions) => {
        // old image exists
        if (course.cover_image) {
            // unchanged image
            if (!values.cover) {
                const data = {
                    id: values.id,
                    course_name: values.name,
                    published_on: values.published_on,
                    course_status: values.course_status,
                    total_videos: values.total_videos,
                    total_duration: values.total_duration,
                    category: Number(values.category),
                    teacher: values.teacher,
                    cover_image: values.cover_image,
                    cover_image_public_id: values.cover_image_public_id,
                };

                Axios.patch(`course/${values.id}/`, data)
                    .then((res) => {
                        swal({
                            title: "Action Successfull",
                            icon: "success",
                            text: "Course updated successfully",
                            type: "success",
                        });
                        router.push("/admin/courses");
                    })
                    .catch((err) => {
                        swal({
                            icon: "error",
                            title: "Action Failed",
                            text: "Unable to update course",
                        });
                        actions.setSubmitting(false);
                    });
            } else {
                // changed image
                const data = new FormData();
                data.append("image", coverImage);
                data.append("folder", "uploads");

                // Todo: fix after image is added in model
                // data.append("public_id", values.cover_image_public_id);

                // sending upload request
                Axios.post("image-upload/", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((res) => {
                        const data = {
                            id: values.id,
                            course_name: values.name,
                            published_on: values.published_on,
                            course_status: values.course_status,
                            total_videos: values.total_videos,
                            total_duration: values.total_duration,
                            category: Number(values.category),
                            teacher: values.teacher,
                            cover_image: res.data.image_url,
                            cover_image_public_id: res.data.public_id,
                        };

                        Axios.patch(`course/${values.id}/`, data)
                            .then((res) => {
                                swal({
                                    title: "Action Successfull",
                                    icon: "success",
                                    text: "Course updated successfully",
                                    type: "success",
                                });
                                router.push("/admin/courses");
                            })
                            .catch((err) => {
                                swal({
                                    icon: "error",
                                    title: "Action Failed",
                                    text: "Unable to update course",
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
            }
        }
    };

    useEffect(() => {
        if (router.query.id) {
            Axios.get(`course/${router.query.id}/`)
                .then((res) => {
                    const {
                        id,
                        course_name,
                        published_on,
                        course_status,
                        total_videos,
                        total_duration,
                        category,
                        teacher,
                        cover_image = "https://res.cloudinary.com/dvflaxjrh/image/upload/v1659855752/uploads/quciahaydhfdbuncf3ig.jpg",
                        cover_image_public_id = "uploads/quciahaydhfdbuncf3ig",
                    } = res.data;

                    setCourse({
                        id,
                        name: course_name,
                        published_on,
                        course_status,
                        total_videos,
                        total_duration,
                        category: category.id,
                        teacher: teacher.id,
                        cover_image,
                        cover_image_public_id,
                        cover: "",
                    });

                    Axios.get("category/all").then((res) => {
                        setCategories(res.data.results);
                        setLoading(false);
                    });
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: "Unable to fetch user's data",
                    });
                    router.push("/admin/courses");
                });
        }
    }, [router.query.id]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <Box>
                    <Heading>Edit Course</Heading>
                </Box>
                <Box pt={8}>
                    <Formik
                        initialValues={{ ...course }}
                        onSubmit={updateCourse}
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
                                            {!coverImage && (
                                                <Box pb={"4"}>
                                                    <AspectRatio>
                                                        <Image
                                                            alt="Preview Cover Image"
                                                            src={
                                                                course.cover_image
                                                            }
                                                            rounded={"xl"}
                                                            shadow={"lg"}
                                                        />
                                                    </AspectRatio>
                                                </Box>
                                            )}

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
                                        Update Course
                                    </Button>
                                </HStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </AdminWrapper>
        </>
    );
};

EditId.layout = "admin";
export default EditId;
