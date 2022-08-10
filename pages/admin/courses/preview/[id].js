import {
    Heading,
    Box,
    Text,
    Input,
    FormLabel,
    FormControl,
    Select,
    FormErrorMessage,
    HStack,
    AspectRatio,
    Image,
    Container,
    useDisclosure,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    Icon,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Formik, Form, Field } from "formik";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Category from "@/components/Card/category";
import ModalDefault from "@/components/Modal";
import { BiVideo } from "react-icons/bi";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import ReactPlayer from "react-player/file";

const PreviewId = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    function fetchData() {
        if (router.query.id) {
            Axios.get(`course/${router.query.id}/`)
                .then((res) => {
                    setCourse({
                        ...res.data,
                    });
                    setLoading(false);
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
    }

    function reload() {
        setLoading(true);
        fetchData();
    }

    function deleteSection(id) {
        Axios.delete(`course-section/${id}/`)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Section is deleted successfully",
                    type: "success",
                });
                reload();
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to delete section",
                    type: "error",
                });
            });
    }

    function changeCourseStatus(id) {
        const data = {
            course_status: "requested",
        };

        Axios.patch(`course/change-status/${id}/`, data)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Course request for approval is sended successfully",
                    type: "success",
                });
                reload();
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to send approval request",
                    type: "error",
                });
            });
    }

    useEffect(() => {
        fetchData();
    }, [router.query.id]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            {!loading && (
                <AdminWrapper show={!loading}>
                    <Container maxW={"container.xl"}>
                        <Box>
                            <Heading>Course Preview</Heading>
                        </Box>
                        <Box pt={8}>
                            <Box pb={"4"}>
                                <Image
                                    alt="Preview Cover Image"
                                    src={course.cover_image}
                                    rounded={"xl"}
                                    shadow={"lg"}
                                />
                            </Box>

                            <Heading
                                textAlign={"center"}
                                px={6}
                                size={"lg"}
                                py={4}
                            >
                                {course.course_name}
                            </Heading>
                            <Text
                                textAlign={"center"}
                                px={6}
                                size={"lg"}
                                py={2}
                            >
                                {course.description}
                            </Text>

                            <HStack justify={"center"} gap={2}>
                                <Category
                                    bg={"teal.200"}
                                    rounded={"full"}
                                    _hover={{
                                        bg: "teal.300",
                                    }}
                                    textTransform={"capitalize"}
                                >
                                    {course.category.category_name}
                                </Category>
                                <Category
                                    bg={"gray.200"}
                                    rounded={"full"}
                                    _hover={{
                                        bg: "gray.300",
                                    }}
                                    textTransform={"capitalize"}
                                >
                                    {course.course_status}
                                </Category>
                            </HStack>

                            {course.course_status == "drafted" && (
                                <HStack justify={"end"} py={10}>
                                    <Button
                                        onClick={() => {
                                            changeCourseStatus(course.id);
                                        }}
                                    >
                                        Send For Approval
                                    </Button>
                                </HStack>
                            )}

                            {/* Sections */}
                            {!course.section.length ? (
                                <Box my={"10"}>
                                    <Heading
                                        textAlign={"center"}
                                        px={6}
                                        size={"lg"}
                                        py={8}
                                    >
                                        No Sections
                                    </Heading>
                                    <HStack justify={"center"} px={6}>
                                        <Image
                                            alt={"No data"}
                                            src={"/empty-data.svg"}
                                            w={{
                                                base: "80%",
                                                md: "60%",
                                                lg: "50%",
                                            }}
                                        />
                                    </HStack>
                                </Box>
                            ) : (
                                <Box
                                    border={"1px"}
                                    borderColor={"gray.200"}
                                    my={4}
                                    me={6}
                                >
                                    <Accordion allowToggle>
                                        {course.section.map((section, i) => {
                                            return (
                                                <SectionItem
                                                    key={i}
                                                    section={section}
                                                    i={i}
                                                    course={course}
                                                    reload={reload}
                                                    deleteSection={
                                                        deleteSection
                                                    }
                                                />
                                            );
                                        })}
                                    </Accordion>
                                </Box>
                            )}

                            {/* Add Section Modal */}
                            <Box>
                                <AddSection
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    title={"Add Section"}
                                    actionName={"Create"}
                                    closeName={"Close"}
                                    courseId={course.id}
                                    reload={reload}
                                />
                            </Box>

                            <HStack justify={"end"} py={10}>
                                <Button onClick={onOpen}>Add Section</Button>
                            </HStack>
                        </Box>
                    </Container>
                </AdminWrapper>
            )}
        </>
    );
};

const AddSection = ({
    title,
    actionName,
    closeName,
    isOpen,
    onClose,
    courseId,
    reload,
}) => {
    const initialFields = {
        title: "",
        description: "",
    };

    function handleAddSection(values, actions) {
        const data = {
            section_tittle: values.title,
            description: values.description,
            course: courseId,
        };

        Axios.post("course-section/", data)
            .then((res) => {
                onClose();
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "New section is added into course",
                    type: "success",
                });
                reload();
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to create new section",
                    type: "error",
                });
                actions.setSubmitting(false);
            });
    }

    const validateTitle = (value) => {
        let error;
        if (value.length >= 10) {
            if (value.length <= 30) {
                error = "";
            } else {
                error = "Title cannot exceed 30 characters";
            }
        } else {
            error = "Title should be at least 10 characters";
        }
        return error;
    };

    const validateDescription = (value) => {
        let error;
        if (value.length >= 20) {
            if (value.length <= 40) {
                error = "";
            } else {
                error = "Description cannot exceed 40 characters";
            }
        } else {
            error = "Description should be at least 20 characters";
        }
        return error;
    };

    return (
        <ModalDefault
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            actionName={actionName}
            closeName={closeName}
        >
            <Formik
                initialValues={initialFields}
                onSubmit={(values, actions) => {
                    handleAddSection(values, actions);
                }}
            >
                {(props) => (
                    <Form id="add-section">
                        {/* title */}
                        <Field name="title" validate={validateTitle}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.title && form.touched.title
                                    }
                                    mb={3}
                                >
                                    <FormLabel
                                        fontWeight={"medium"}
                                        fontSize={"lg"}
                                        htmlFor="title"
                                    >
                                        Title{" "}
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
                                        id="title"
                                        placeholder="Title"
                                        size={"lg"}
                                        focusBorderColor={"primary"}
                                        errorBorderColor={"danger"}
                                    />
                                    <FormErrorMessage color={"danger"}>
                                        {form.errors.title}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        {/* description */}
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
                                        htmlFor="description"
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

                        <HStack justify={"center"}>
                            <Button
                                mt={4}
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </ModalDefault>
    );
};

const AddVideo = ({ title, isOpen, onClose, sectionId, reload }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [canUpload, setCanUpload] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);
    const videoUpload = useRef(null);

    const initialFields = {
        title: "",
        description: "",
        video: "",
    };

    async function selectFile(file) {
        //   if file does not exists
        if (!file) {
            return "File does not exists";
        }

        // validations: I may change them in future for now, its ok
        const pattern = new RegExp(/(mp4)/);
        if (!pattern.test(file.type)) {
            return "Only mp4 files are allowed";
        }

        // mb -> bytes
        const converter = (sizeInMb) => sizeInMb * 1024 * 1024;

        // file should be less than 2 mb
        if (!(file.size < converter(100))) {
            return "Video size should be less than 100 MB";
        }

        //   file size should be greater than 50 Kb
        if (!(file.size > converter(10))) {
            return "Video size should be greater than 10 MB";
        }

        setVideoFile(file);

        const readData = (f) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(f);
            });

        const data = await readData(file);

        const videoElement = document.createElement("VIDEO");
        videoElement.src = data;

        videoElement.addEventListener("loadedmetadata", () => {
            const _duration = Math.floor(videoElement.duration);
            setVideoDuration(_duration);
            setCanUpload(true);
        });

        return "";
    }

    function handleAddVideo(values, actions) {
        const data = new FormData();
        data.append("video", videoFile);
        data.append("folder", "videos");

        // sending upload request
        Axios.post("video-upload/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                const formData = {
                    video_title: values.title,
                    description: values.description,
                    section: sectionId,
                    duration: videoDuration,
                    video_link: res.data.video_url,
                    video_link_public_id: res.data.public_id,
                };
                Axios.post("course-video/", formData)
                    .then((res) => {
                        swal({
                            title: "Action Successfull",
                            icon: "success",
                            text: "Video created successfully",
                            type: "success",
                        });
                        reload();
                    })
                    .catch((err) => {
                        swal({
                            icon: "error",
                            title: "Action Failed",
                            text: "Unable to create video",
                        });
                        actions.setSubmitting(false);
                    });
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to upload video",
                });
                actions.setSubmitting(false);
            });
    }

    const validateTitle = (value) => {
        let error;
        if (value.length >= 10) {
            if (value.length <= 30) {
                error = "";
            } else {
                error = "Title cannot exceed 30 characters";
            }
        } else {
            error = "Title should be at least 10 characters";
        }
        return error;
    };

    const validateDescription = (value) => {
        let error;
        if (value.length >= 20) {
            if (value.length <= 40) {
                error = "";
            } else {
                error = "Description cannot exceed 40 characters";
            }
        } else {
            error = "Description should be at least 20 characters";
        }
        return error;
    };

    const validateVideo = async (value) => {
        let error;
        if (value) {
            error = await selectFile(videoUpload.current.files[0]);
        } else {
            error = "Select a video";
        }
        return error;
    };

    return (
        <ModalDefault isOpen={isOpen} onClose={onClose} title={title}>
            <Formik
                initialValues={initialFields}
                onSubmit={(values, actions) => {
                    handleAddVideo(values, actions);
                }}
            >
                {(props) => (
                    <Form id="add-section">
                        {/* title */}
                        <Field name="title" validate={validateTitle}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.title && form.touched.title
                                    }
                                    mb={3}
                                >
                                    <FormLabel
                                        fontWeight={"medium"}
                                        fontSize={"lg"}
                                        htmlFor="title"
                                    >
                                        Title{" "}
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
                                        id="title"
                                        placeholder="Title"
                                        size={"lg"}
                                        focusBorderColor={"primary"}
                                        errorBorderColor={"danger"}
                                    />
                                    <FormErrorMessage color={"danger"}>
                                        {form.errors.title}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        {/* description */}
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
                                        htmlFor="description"
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

                        {/* video */}
                        <Field name="video" validate={validateVideo}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.video && form.touched.video
                                    }
                                    mb={3}
                                >
                                    <FormLabel
                                        fontWeight={"medium"}
                                        fontSize={"lg"}
                                        htmlFor="video"
                                    >
                                        Video{" "}
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
                                        ref={videoUpload}
                                        type={"file"}
                                        size={"lg"}
                                        variant={"unstyled"}
                                    />
                                    <FormErrorMessage color={"danger"}>
                                        {form.errors.video}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <HStack justify={"center"}>
                            <Button
                                mt={4}
                                isLoading={props.isSubmitting}
                                type="submit"
                                disabled={!canUpload}
                            >
                                Submit
                            </Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </ModalDefault>
    );
};

const EditSection = ({
    title,
    description,
    sectionId,
    courseId,
    reload,
    isOpen,
    onClose,
}) => {
    const initialFields = {
        title: title,
        description: description,
    };

    function handleUpdateSection(values, actions) {
        const data = {
            section_tittle: values.title,
            description: values.description,
            course: courseId,
        };

        Axios.patch(`course-section/${sectionId}/`, data)
            .then((res) => {
                onClose();
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Section is updated successfully",
                    type: "success",
                });
                reload();
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to update section",
                    type: "error",
                });
                actions.setSubmitting(false);
            });
    }

    const validateTitle = (value) => {
        let error;
        if (value.length >= 10) {
            if (value.length <= 30) {
                error = "";
            } else {
                error = "Title cannot exceed 30 characters";
            }
        } else {
            error = "Title should be at least 10 characters";
        }
        return error;
    };

    const validateDescription = (value) => {
        let error;
        if (value.length >= 20) {
            if (value.length <= 40) {
                error = "";
            } else {
                error = "Description cannot exceed 40 characters";
            }
        } else {
            error = "Description should be at least 20 characters";
        }
        return error;
    };

    return (
        <ModalDefault
            isOpen={isOpen}
            onClose={onClose}
            title={"Update Section"}
        >
            <Formik
                initialValues={initialFields}
                onSubmit={(values, actions) => {
                    handleUpdateSection(values, actions);
                }}
            >
                {(props) => (
                    <Form id="add-section">
                        {/* title */}
                        <Field name="title" validate={validateTitle}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.title && form.touched.title
                                    }
                                    mb={3}
                                >
                                    <FormLabel
                                        fontWeight={"medium"}
                                        fontSize={"lg"}
                                        htmlFor="title"
                                    >
                                        Title{" "}
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
                                        id="title"
                                        placeholder="Title"
                                        size={"lg"}
                                        focusBorderColor={"primary"}
                                        errorBorderColor={"danger"}
                                    />
                                    <FormErrorMessage color={"danger"}>
                                        {form.errors.title}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        {/* description */}
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
                                        htmlFor="description"
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

                        <HStack justify={"center"}>
                            <Button
                                mt={4}
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                Update
                            </Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </ModalDefault>
    );
};

const SectionItem = ({ section, i, course, reload, deleteSection }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const addVideo = useDisclosure();

    return (
        <AccordionItem
            key={i}
            {...(i == 0 && {
                borderTop: "0",
            })}
            {...(i == course.section.length - 1 && {
                borderBottom: "0",
            })}
        >
            <EditSection
                isOpen={isOpen}
                onClose={onClose}
                courseId={course.id}
                title={section.section_tittle}
                description={section.description}
                sectionId={section.id}
                reload={reload}
            />
            <HStack position={"relative"}>
                <Stack gap={3} position={"absolute"} fontSize={"lg"} right={-7}>
                    <Icon
                        cursor={"pointer"}
                        color={"warning"}
                        as={HiPencilAlt}
                        onClick={() => {
                            onOpen();
                        }}
                    />
                    <Icon
                        cursor={"pointer"}
                        color={"danger"}
                        as={HiTrash}
                        onClick={() => {
                            deleteSection(section.id);
                        }}
                    />
                </Stack>
                <AccordionButton
                    _expanded={{
                        bg: "blackAlpha.50",
                    }}
                    py={3}
                    marginInline={"0 !important"}
                >
                    <HStack
                        flex="1"
                        textAlign="left"
                        gap={"2"}
                        alignItems={"flex-start"}
                    >
                        <Text fontSize={"xl"}>{i + 1}</Text>
                        <Box>
                            <Text fontSize={"xl"} textTransform={"capitalize"}>
                                {section.section_tittle}{" "}
                            </Text>

                            <Text fontSize={"md"} color={"gray.600"} mb={2}>
                                {section.description}
                            </Text>

                            <Text fontSize={"md"} color={"gray.600"}>
                                {section.video.length} Lessons
                            </Text>
                        </Box>
                    </HStack>
                    <AccordionIcon />
                </AccordionButton>
            </HStack>
            <AccordionPanel p={0}>
                <Box>
                    {/* Add Video */}
                    <AddVideo
                        isOpen={addVideo.isOpen}
                        onClose={addVideo.onClose}
                        reload={reload}
                        title={"Add Video"}
                        sectionId={section.id}
                    />

                    {section.video.length ? (
                        <Box>
                            {section.video.map((video) => {
                                return (
                                    <VideoItem
                                        key={i}
                                        reload={reload}
                                        video={video}
                                    />
                                );
                            })}
                        </Box>
                    ) : (
                        <Box px={10} pt={2}>
                            <Text fontSize={"xl"}>No Videos</Text>
                        </Box>
                    )}

                    <HStack
                        px={10}
                        py={4}
                        justify={"end"}
                        onClick={addVideo.onOpen}
                    >
                        <Button>Add Video</Button>
                    </HStack>
                </Box>
            </AccordionPanel>
        </AccordionItem>
    );
};

const EditVideo = ({ video, reload, isOpen, onClose }) => {
    const [videoFile, setVideoFile] = useState(null);
    const [canUpload, setCanUpload] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);
    const videoUpload = useRef(null);

    const initialFieldsForChangingData = {
        title: video.video_title,
        description: video.description,
    };

    const initialFieldsForChangingVideo = {
        title: video.video_title,
        description: video.description,
    };

    function handleUpdateVideoData(values, actions) {
        const data = {
            video_title: values.title,
            description: values.description,
            section: video.section,
            duration: video.duration,
            video_link: video.video_link,
            video_link_public_id: video.video_link_public_id,
        };

        Axios.patch(`course-video/${video.id}/`, data)
            .then((res) => {
                onClose();
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Video is updated successfully",
                    type: "success",
                });
                reload();
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to update video",
                    type: "error",
                });
                actions.setSubmitting(false);
            });
    }

    async function selectFile(file) {
        //   if file does not exists
        if (!file) {
            return "File does not exists";
        }

        // validations: I may change them in future for now, its ok
        const pattern = new RegExp(/(mp4)/);
        if (!pattern.test(file.type)) {
            return "Only mp4 files are allowed";
        }

        // mb -> bytes
        const converter = (sizeInMb) => sizeInMb * 1024 * 1024;

        // file should be less than 2 mb
        if (!(file.size < converter(100))) {
            return "Video size should be less than 100 MB";
        }

        //   file size should be greater than 50 Kb
        if (!(file.size > converter(10))) {
            return "Video size should be greater than 10 MB";
        }

        setVideoFile(file);

        const readData = (f) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(f);
            });

        const data = await readData(file);

        const videoElement = document.createElement("VIDEO");
        videoElement.src = data;

        videoElement.addEventListener("loadedmetadata", () => {
            const _duration = Math.floor(videoElement.duration);
            setVideoDuration(_duration);
            setCanUpload(true);
        });

        return "";
    }

    function handleUpdateVideoFile(values, actions) {
        const data = new FormData();
        data.append("video", videoFile);
        data.append("folder", "videos");
        data.append("public_id", video.video_link_public_id);

        // sending upload request
        Axios.post("video-upload/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                const formData = {
                    video_title: video.video_title,
                    description: video.description,
                    section: video.section,
                    duration: videoDuration,
                    video_link: res.data.video_url,
                    video_link_public_id: res.data.public_id,
                };
                Axios.patch(`course-video/${video.id}/`, formData)
                    .then((res) => {
                        swal({
                            title: "Action Successfull",
                            icon: "success",
                            text: "Video file updated successfully",
                            type: "success",
                        });
                        reload();
                    })
                    .catch((err) => {
                        swal({
                            icon: "error",
                            title: "Action Failed",
                            text: "Unable to update video file",
                        });
                        actions.setSubmitting(false);
                    });
            })
            .catch((err) => {
                console.log(err);
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to upload video",
                });
                actions.setSubmitting(false);
            });
    }

    const validateTitle = (value) => {
        let error;
        if (value.length >= 10) {
            if (value.length <= 30) {
                error = "";
            } else {
                error = "Title cannot exceed 30 characters";
            }
        } else {
            error = "Title should be at least 10 characters";
        }
        return error;
    };

    const validateDescription = (value) => {
        let error;
        if (value.length >= 20) {
            if (value.length <= 40) {
                error = "";
            } else {
                error = "Description cannot exceed 40 characters";
            }
        } else {
            error = "Description should be at least 20 characters";
        }
        return error;
    };

    const validateVideo = async (value) => {
        let error;
        if (value) {
            error = await selectFile(videoUpload.current.files[0]);
        } else {
            error = "Select a video";
        }
        return error;
    };

    return (
        <ModalDefault isOpen={isOpen} onClose={onClose} title={"Update Video"}>
            <Tabs isFitted variant="solid-rounded">
                <TabList mb="1em">
                    <Tab _selected={{ bg: "primary", color: "white" }}>
                        Change Fields
                    </Tab>
                    <Tab _selected={{ bg: "primary", color: "white" }}>
                        Change Video
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Formik
                            initialValues={initialFieldsForChangingData}
                            onSubmit={(values, actions) => {
                                handleUpdateVideoData(values, actions);
                            }}
                        >
                            {(props) => (
                                <Form id="add-section">
                                    {/* title */}
                                    <Field
                                        name="title"
                                        validate={validateTitle}
                                    >
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.title &&
                                                    form.touched.title
                                                }
                                                mb={3}
                                            >
                                                <FormLabel
                                                    fontWeight={"medium"}
                                                    fontSize={"lg"}
                                                    htmlFor="title"
                                                >
                                                    Title{" "}
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
                                                    id="title"
                                                    placeholder="Title"
                                                    size={"lg"}
                                                    focusBorderColor={"primary"}
                                                    errorBorderColor={"danger"}
                                                />
                                                <FormErrorMessage
                                                    color={"danger"}
                                                >
                                                    {form.errors.title}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    {/* description */}
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
                                                    htmlFor="description"
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
                                                <FormErrorMessage
                                                    color={"danger"}
                                                >
                                                    {form.errors.description}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <HStack justify={"center"}>
                                        <Button
                                            mt={4}
                                            isLoading={props.isSubmitting}
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </HStack>
                                </Form>
                            )}
                        </Formik>
                    </TabPanel>
                    <TabPanel>
                        <Formik
                            initialValues={initialFieldsForChangingVideo}
                            onSubmit={(values, actions) => {
                                handleUpdateVideoFile(values, actions);
                            }}
                        >
                            {(props) => (
                                <Form id="add-section">
                                    {/* video */}
                                    <Field
                                        name="video"
                                        validate={validateVideo}
                                    >
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.video &&
                                                    form.touched.video
                                                }
                                                mb={3}
                                            >
                                                <FormLabel
                                                    fontWeight={"medium"}
                                                    fontSize={"lg"}
                                                    htmlFor="video"
                                                >
                                                    Video{" "}
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
                                                    ref={videoUpload}
                                                    type={"file"}
                                                    size={"lg"}
                                                    variant={"unstyled"}
                                                />
                                                <FormErrorMessage
                                                    color={"danger"}
                                                >
                                                    {form.errors.video}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <HStack justify={"center"}>
                                        {canUpload ? (
                                            <Button
                                                mt={4}
                                                isLoading={props.isSubmitting}
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        ) : (
                                            <Button
                                                mt={4}
                                                isLoading={props.isSubmitting}
                                                type="submit"
                                                disabled={true}
                                            >
                                                Submit
                                            </Button>
                                        )}
                                    </HStack>
                                </Form>
                            )}
                        </Formik>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </ModalDefault>
    );
};

function VideoItem({ video, reload }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const videoDisclosure = useDisclosure();

    function deleteVideo(id) {
        Axios.delete(`course-video/${id}/`)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Video Deleted successfully",
                    type: "success",
                });
                reload();
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to delete video",
                    type: "error",
                });
                reload();
            });
    }

    function openVideo() {
        videoDisclosure.onOpen();
    }

    return (
        <HStack
            flex="1"
            textAlign="left"
            gap={"2"}
            alignItems={"flex-start"}
            cursor={"pointer"}
            py={3}
            px={4}
            _hover={{
                bg: "blackAlpha.50",
            }}
            borderBottom={"1px"}
            borderColor={"gray.200"}
            transitionProperty={"var(--chakra-transition-property-common)"}
            transitionDuration={"var(--chakra-transition-duration-normal)"}
            pos={"relative"}
        >
            <EditVideo
                isOpen={isOpen}
                onClose={onClose}
                video={video}
                reload={reload}
            />

            <ModalDefault
                title={video.video_title}
                isOpen={videoDisclosure.isOpen}
                onClose={videoDisclosure.onClose}
                size={{ base: "sm", sm: "6xl" }}
            >
                <AspectRatio ratio={16 / 9} bg={"gray.200"}>
                    <div>
                        <ReactPlayer
                            url={video.video_link}
                            width={"100%"}
                            height={"100%"}
                            controls={true}
                        />
                    </div>
                </AspectRatio>
            </ModalDefault>

            <Stack gap={3} fontSize={"lg"}>
                <Icon
                    cursor={"pointer"}
                    color={"warning"}
                    as={HiPencilAlt}
                    onClick={() => {
                        onOpen();
                    }}
                />
                <Icon
                    cursor={"pointer"}
                    color={"danger"}
                    as={HiTrash}
                    onClick={() => {
                        deleteVideo(video.id);
                    }}
                />
            </Stack>
            <HStack
                _hover={{
                    color: "primary",
                }}
                onClick={openVideo}
            >
                <Text fontSize={"xl"} alignSelf={"flex-start"}>
                    <Icon as={BiVideo} />
                </Text>
                <Box>
                    <Text fontSize={"xl"}>{video.video_title}</Text>
                    {/* <Text fontSize={"lg"} pb={2}>
                        {video.video_link}
                    </Text> */}
                    <Text fontSize={"md"} color={"gray.600"}>
                        Video
                    </Text>
                </Box>
            </HStack>
        </HStack>
    );
}

PreviewId.layout = "admin";
export default PreviewId;
