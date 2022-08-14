import {
    Box,
    Heading,
    HStack,
    Accordion,
    Text,
    Avatar,
    AccordionButton,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    Icon,
    Tabs,
    TabList,
    FormLabel,
    Textarea,
    FormControl,
    FormErrorMessage,
    TabPanels,
    Tab,
    TabPanel,
    AspectRatio,
    useBreakpointValue,
    Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiCalendar, BiCheck, BiVideo } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import ReactPlayer from "react-player/file";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Axios from "utils/fetcher";
import { useRouter } from "next/router";
import EmptyData from "@/components/EmptyData";
import { Formik, Form, Field } from "formik";
import swal from "@sweetalert/with-react";
import Button from "@/components/Button";
import ReactStars from "react-rating-stars-component";
import useStore from "store";
import { formatDate } from "utils/tools";
import ButtonPagination from "@/components/ButtonPagination";
import StarRatingComponent from "react-star-rating-component";

const WatchCoursePage = () => {
    const [player, setPlayer] = useState({
        loading: true,
        course: null,
        currentSection: {
            id: null,
            currentVideo: {
                id: null,
                videoUrl: null,
            },
        },
        shouldGiveReview: true,
        enrollment: null,
        metaData: null,
    });
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const setUserData = useStore((state) => state.setUserData);
    const router = useRouter();

    function setCurrentVideo(data) {
        setPlayer({ ...player, currentSection: data });
    }

    function saveLastWatchedVideo(currentSection, currentVideo, videoUrl) {
        const data = {
            id: player.enrollment.id,
            student: player.enrollment.student,
            course: player.enrollment.course,
            meta_data: {
                progress: player.metaData.progress,
                history: [...player.metaData.history],
                currentSection: {
                    id: currentSection,
                    currentVideo: {
                        id: currentVideo,
                        videoUrl: videoUrl,
                    },
                },
            },
        };

        Axios.patch(`course-enroll/current-student/${router.query.id}/`, data);
    }

    function saveCompletedVideo(id, currentSection, currentVideo, videoUrl) {
        const watchedHistory = new Set([...player.metaData.history]);
        watchedHistory.add(id);
        const history = Array.from(watchedHistory);
        const progress = Math.floor(
            (history.length / player.course.total_videos) * 100
        );

        // meta data
        const meta_data = {
            progress: progress,
            history: history,
            currentSection: {
                id: currentSection,
                currentVideo: {
                    id: currentVideo,
                    videoUrl: videoUrl,
                },
            },
        };
        // save
        const data = {
            id: player.enrollment.id,
            student: player.enrollment.student,
            course: player.enrollment.course,
            meta_data: meta_data,
        };

        Axios.patch(
            `course-enroll/current-student/${router.query.id}/`,
            data
        ).then(() => {
            setPlayer({ ...player, metaData: meta_data });
        });
    }

    function saveLastWatchedCourse(id) {
        const data = {
            history: {
                lastWatchedCourse: id,
            },
        };
        Axios.patch("users/current-user", data).then((res) => {
            Axios.get("users/current-user").then((res) => {
                setUserData(res.data);
            });
        });
    }

    useEffect(() => {
        if (router.query.id) {
            Axios.get(`course-enroll/current-student/${router.query.id}/`)
                .then((res) => {
                    const enrollment = res.data;
                    Axios.get(`course/${router.query.id}/`).then((res) => {
                        const course = res.data;

                        saveLastWatchedCourse(course.id);

                        // if meta data exists
                        if (!!enrollment.meta_data) {
                            setPlayer({
                                ...player,
                                loading: false,
                                course: course,
                                currentSection: {
                                    id: enrollment.meta_data.currentSection.id,
                                    currentVideo: {
                                        id: enrollment.meta_data.currentSection
                                            .currentVideo.id,
                                        videoUrl:
                                            enrollment.meta_data.currentSection
                                                .currentVideo.videoUrl,
                                    },
                                },
                                shouldGiveReview: !course.has_review,
                                enrollment: enrollment,
                                metaData: enrollment.meta_data,
                            });
                        }

                        // if meta data does not exists
                        else {
                            const data = {
                                id: enrollment.id,
                                meta_data: {
                                    progress: 0,
                                    history: [],
                                    currentSection: {
                                        id: course.section[0].id,
                                        currentVideo: {
                                            id: course.section[0].video[0].id,
                                            videoUrl:
                                                course.section[0].video[0]
                                                    .video_link,
                                        },
                                    },
                                },
                                student: enrollment.student,
                                course: enrollment.course,
                            };

                            Axios.patch(
                                `course-enroll/current-student/${router.query.id}/`,
                                data
                            )
                                .then((res) => {
                                    setPlayer({
                                        ...player,
                                        loading: false,
                                        course: course,
                                        currentSection: {
                                            id: course.section[0].id,
                                            currentVideo: {
                                                id: course.section[0].video[0]
                                                    .id,
                                                videoUrl:
                                                    course.section[0].video[0]
                                                        .video_link,
                                            },
                                        },
                                        shouldGiveReview: !course.has_review,
                                        enrollment: enrollment,
                                        metaData: data.meta_data,
                                    });
                                })
                                .catch((err) => {
                                    swal({
                                        icon: "error",
                                        title: "Error !!",
                                        text: "Unable to access course data.",
                                    });
                                    router.push("/dashboard");
                                });
                        }
                    });
                })

                .catch((err) => {});
        }
    }, [router.query.id]);

    return (
        <>
            <Loader isLoading={player.loading} />
            {!player.loading && (
                <Box display={"flex"} height={"100vh"}>
                    {/* left */}
                    <Box
                        mr={{ lg: "500px" }}
                        w={"100%"}
                        h={"100vh"}
                        overflowY={"auto"}
                        bg={"white"}
                    >
                        {/* top menu */}
                        <HStack
                            h={"60px"}
                            px={"4"}
                            borderBottom={"1px"}
                            borderColor={"gray.200"}
                            position={"sticky"}
                            top={0}
                            bg={"white"}
                            gap={"3"}
                            zIndex={"1000"}
                        >
                            <Link href={"/dashboard"}>
                                <Icon
                                    as={HiOutlineArrowLeft}
                                    fontSize={{ base: "xl", lg: "2xl" }}
                                    cursor={"pointer"}
                                    mt={{ base: "-4px" }}
                                />
                            </Link>
                            <Heading
                                fontSize={{ base: "xl", lg: "2xl" }}
                                noOfLines={1}
                                textTransform={"capitalize"}
                            >
                                {player.course.course_name}
                            </Heading>
                        </HStack>

                        {/* Bottom */}
                        <Box>
                            {/* Video Component */}
                            <AspectRatio ratio={16 / 9} bg={"gray.200"}>
                                <div>
                                    {/* {!isSSR && ( */}
                                    <ReactPlayer
                                        url={
                                            player.currentSection.currentVideo
                                                .videoUrl
                                        }
                                        width={"100%"}
                                        height={"100%"}
                                        controls={true}
                                        onEnded={() => {
                                            saveCompletedVideo(
                                                player.currentSection
                                                    .currentVideo.id,
                                                player.currentSection.id,
                                                player.currentSection
                                                    .currentVideo.id,
                                                player.currentSection
                                                    .currentVideo.videoUrl
                                            );
                                        }}
                                        onReady={() => {
                                            saveLastWatchedVideo(
                                                player.currentSection.id,
                                                player.currentSection
                                                    .currentVideo.id,
                                                player.currentSection
                                                    .currentVideo.videoUrl
                                            );
                                        }}
                                    />
                                    {/* )} */}
                                </div>
                            </AspectRatio>

                            {/* Navs */}
                            <Box>
                                {isMobile && (
                                    <TabComponent
                                        index={0}
                                        sections={player.course.section}
                                        setCurrentVideo={setCurrentVideo}
                                        currentSectionId={
                                            player.currentSection.id
                                        }
                                        courseDescription={
                                            player.course.description
                                        }
                                        shouldGiveReview={
                                            player.shouldGiveReview
                                        }
                                        courseId={player.course.id}
                                        currentVideoId={
                                            player.currentSection.currentVideo
                                                .id
                                        }
                                        history={player.metaData.history}
                                    />
                                )}
                                {!isMobile && (
                                    <TabComponent
                                        index={1}
                                        sections={player.course.section}
                                        setCurrentVideo={setCurrentVideo}
                                        currentSectionId={
                                            player.currentSection.id
                                        }
                                        currentVideoId={
                                            player.currentSection.currentVideo
                                                .id
                                        }
                                        courseDescription={
                                            player.course.description
                                        }
                                        shouldGiveReview={
                                            player.shouldGiveReview
                                        }
                                        courseId={player.course.id}
                                        history={player.metaData.history}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>

                    {/* right */}
                    <Box
                        minH={"100vh"}
                        borderLeft={"1px"}
                        borderColor={"gray.200"}
                        bg={"white"}
                        position={"fixed"}
                        right={"0"}
                        top={"0"}
                        bottom={"0"}
                        overflowY={"scroll"}
                        w={"100%"}
                        maxW={"500px"}
                        display={{ base: "none", lg: "block" }}
                    >
                        {/* top title */}
                        <HStack
                            h={"60px"}
                            px={"4"}
                            borderBottom={"1px"}
                            borderColor={"gray.200"}
                            position={"sticky"}
                            top={0}
                            bg={"white"}
                        >
                            <Heading fontSize={{ lg: "3xl" }}>Syllabus</Heading>
                        </HStack>

                        {/* course content accordian */}
                        <Box>
                            <AccordionComponent
                                sections={player.course.section}
                                setCurrentVideo={setCurrentVideo}
                                currentSectionId={player.currentSection.id}
                                currentVideoId={
                                    player.currentSection.currentVideo.id
                                }
                                history={player.metaData.history}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

function TabComponent({
    index,
    sections,
    setCurrentVideo,
    currentSectionId,
    courseDescription,
    courseId,
    shouldGiveReview,
    currentVideoId,
    history,
}) {
    const userData = useStore((state) => state.userData);
    const [canGiveReview, setCanGiveReview] = useState(shouldGiveReview);
    const [rating, setRating] = useState({
        value: 0,
        error: {
            message: "",
        },
    });

    const [reviews, setReviews] = useState({
        data: [],
        pagination: null,
    });

    const initialFields = {
        review: "",
    };

    const validateReview = (value) => {
        let error;
        if (value.length >= 10) {
            if (value.length <= 100) {
                error = "";
            } else {
                error = "Message should not be greater than 100 characters";
            }
        } else {
            error = "Message should be greater than 10 characters";
        }
        return error;
    };

    const handleRatingChange = (value) => {
        if (value == 0) {
            setRating({
                ...review,
                value: value,
                error: { message: "Rating cannot be empty" },
            });
        } else {
            setRating({ ...review, value: value, error: { message: "" } });
        }
    };

    const handleReviewSubmit = (values, actions) => {
        handleRatingChange(rating.value);

        if (rating.value) {
            const data = {
                rating: rating.value,
                feedback: values.review,
                course: [courseId],
                student: [userData.id],
            };
            Axios.post("course-review/", data)
                .then((res) => {
                    swal({
                        icon: "success",
                        title: "Success",
                        text: "Course Review Added Successfully",
                    });
                    setCanGiveReview(false);
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Error !!",
                        text: "Unable to add course review",
                    });
                    actions.setSubmitting(false);
                });
        } else {
            actions.setSubmitting(false);
        }
    };

    const fetchReviews = (id, page = 1) => {
        Axios.get(`course-review/all/${id}/?page=${page}`).then((res) => {
            setReviews({
                data: res.data.results,
                pagination: res.data.pagination,
            });
        });
    };

    const getPage = (page) => {
        fetchReviews(courseId, page);
    };

    useEffect(() => {
        fetchReviews(courseId);
    }, [canGiveReview]);

    return (
        <Tabs size={"lg"} variant={"line"} defaultIndex={index}>
            <TabList borderBottom={"1px"} borderColor={"gray.200"} h={"60px"}>
                <Tab
                    fontSize={{ base: "lg", lg: "xl" }}
                    fontWeight={"bold"}
                    _selected={{
                        color: "primary",
                        borderColor: "primary",
                    }}
                    display={{ lg: "none" }}
                >
                    Syllabus
                </Tab>

                <Tab
                    fontSize={{ base: "lg", lg: "xl" }}
                    fontWeight={"bold"}
                    _selected={{
                        color: "primary",
                        borderColor: "primary",
                    }}
                >
                    About
                </Tab>
                <Tab
                    fontSize={{ base: "lg", lg: "xl" }}
                    fontWeight={"bold"}
                    _selected={{
                        color: "primary",
                        borderColor: "primary",
                    }}
                >
                    Reviews
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel display={{ lg: "none" }} p={0}>
                    <AccordionComponent
                        sections={sections}
                        setCurrentVideo={setCurrentVideo}
                        currentSectionId={currentSectionId}
                        currentVideoId={currentVideoId}
                        history={history}
                    />
                </TabPanel>
                <TabPanel>{courseDescription}</TabPanel>
                <TabPanel>
                    {canGiveReview && (
                        <Box
                            border={"1px"}
                            borderColor={"gray.200"}
                            rounded={"xl"}
                            p={4}
                        >
                            <Formik
                                initialValues={initialFields}
                                onSubmit={(values, actions) => {
                                    handleReviewSubmit(values, actions);
                                }}
                            >
                                {(props) => (
                                    <Form id="edit-profile">
                                        <Heading fontSize={"xl"} mb={6}>
                                            Add Review
                                        </Heading>

                                        {/* rating stars */}
                                        <FormControl
                                            isInvalid={!!rating.error.message}
                                            mb={4}
                                        >
                                            <FormLabel
                                                fontWeight={"medium"}
                                                fontSize={"lg"}
                                                htmlFor="name"
                                            >
                                                Rating{" "}
                                                <span
                                                    style={{
                                                        color: "var(--chakra-colors-danger)",
                                                    }}
                                                >
                                                    *
                                                </span>
                                            </FormLabel>
                                            <ReactStars
                                                id="rating"
                                                count={5}
                                                size={30}
                                                activeColor="#ffd700"
                                                edit={true}
                                                value={rating.value}
                                                onChange={handleRatingChange}
                                            />
                                            <FormErrorMessage color={"danger"}>
                                                {rating.error.message}
                                            </FormErrorMessage>
                                        </FormControl>

                                        {/*message */}
                                        <Field
                                            name="review"
                                            validate={validateReview}
                                        >
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={
                                                        form.errors.review &&
                                                        form.touched.review
                                                    }
                                                    mb={2}
                                                >
                                                    <FormLabel
                                                        fontWeight={"medium"}
                                                        fontSize={"lg"}
                                                        htmlFor="email"
                                                    >
                                                        Message{" "}
                                                        <span
                                                            style={{
                                                                color: "var(--chakra-colors-danger)",
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </FormLabel>
                                                    <Textarea
                                                        {...field}
                                                        id="review"
                                                        placeholder="Message"
                                                        size={"lg"}
                                                        rows={"4"}
                                                        focusBorderColor={
                                                            "primary"
                                                        }
                                                        errorBorderColor={
                                                            "danger"
                                                        }
                                                    />
                                                    <FormErrorMessage
                                                        color={"danger"}
                                                    >
                                                        {form.errors.review}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <HStack justify={"end"}>
                                            <Button
                                                mt={2}
                                                isLoading={props.isSubmitting}
                                                type="submit"
                                                px={6}
                                                py={2}
                                            >
                                                Send
                                            </Button>
                                        </HStack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    )}

                    {!reviews.data.length && (
                        <Box my={10}>
                            <EmptyData show={true} value={"No Reviews Yet"} />
                        </Box>
                    )}

                    {!!reviews.data.length && (
                        <>
                            <Box>
                                {reviews.data.map((review, i) => {
                                    const name = review.student[0].name;
                                    const link =
                                        review.student[0].profile_image;
                                    const message = review.feedback;
                                    const rating = review.rating;
                                    const date = review.created_on;

                                    return (
                                        <UserReview
                                            key={i}
                                            name={name}
                                            link={link}
                                            message={message}
                                            rating={rating}
                                            date={date}
                                        />
                                    );
                                })}
                            </Box>
                            {/* pagination */}
                            <Box
                                my={4}
                                border={"1px"}
                                borderColor={"gray.200"}
                                rounded={"xl"}
                                p={4}
                            >
                                <ButtonPagination
                                    count={reviews.pagination.count}
                                    current={reviews.pagination.current}
                                    next={reviews.pagination.next}
                                    previous={reviews.pagination.previous}
                                    functionToCall={getPage}
                                />
                            </Box>
                        </>
                    )}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

function AccordionComponent({
    sections,
    setCurrentVideo,
    currentSectionId,
    currentVideoId,
    history,
}) {
    // console.log(currentSectionId);
    const indexList = sections.map((_, i) => i);

    const _selected = indexList.filter(
        (i) => sections[i].id == currentSectionId
    );

    return (
        <Accordion allowToggle defaultIndex={_selected}>
            {sections.map((section, i) => {
                return (
                    <AccordionItem
                        key={i}
                        {...(i == 0 ? { borderTop: "0" } : {})}
                        _expanded={true}
                    >
                        <h2>
                            <AccordionButton
                                _expanded={{
                                    bg: "blackAlpha.50",
                                }}
                                py={3}
                            >
                                <HStack
                                    flex="1"
                                    textAlign="left"
                                    gap={"2"}
                                    alignItems={"flex-start"}
                                >
                                    <Text fontSize={"xl"}>{i + 1}</Text>
                                    <Box>
                                        <Text fontSize={"xl"}>
                                            {section.section_tittle}
                                        </Text>
                                        <Text
                                            fontSize={"md"}
                                            color={"gray.600"}
                                        >
                                            {section.video.length} Lessons
                                        </Text>
                                    </Box>
                                </HStack>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel p={0}>
                            <Box>
                                {section.video.map((video) => {
                                    return (
                                        <HStack
                                            key={i}
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
                                            borderTop={"1px"}
                                            borderColor={"gray.200"}
                                            transitionProperty={
                                                "var(--chakra-transition-property-common)"
                                            }
                                            transitionDuration={
                                                "var(--chakra-transition-duration-normal)"
                                            }
                                            bg={
                                                currentVideoId == video.id
                                                    ? "blackAlpha.50"
                                                    : "transparent"
                                            }
                                            onClick={() => {
                                                setCurrentVideo({
                                                    id: section.id,
                                                    currentVideo: {
                                                        id: video.id,
                                                        videoUrl:
                                                            video.video_link,
                                                    },
                                                });
                                            }}
                                        >
                                            <Text fontSize={"xl"}>
                                                <Icon as={BiVideo} />
                                            </Text>
                                            <Box w={"100%"}>
                                                <Text
                                                    fontSize={"xl"}
                                                    textTransform={"capitalize"}
                                                >
                                                    {video.video_title}
                                                </Text>
                                                <HStack
                                                    justify={"space-between"}
                                                >
                                                    <Text
                                                        fontSize={"md"}
                                                        color={"gray.600"}
                                                    >
                                                        Video
                                                    </Text>

                                                    {history.includes(
                                                        video.id
                                                    ) && (
                                                        <Icon
                                                            as={BiCheck}
                                                            fontSize={"2xl"}
                                                            color={"success"}
                                                        />
                                                    )}
                                                </HStack>
                                            </Box>
                                        </HStack>
                                    );
                                })}
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

function UserReview({ name, link, rating, message, date }) {
    return (
        <Box
            border={"1px"}
            borderColor={"gray.200"}
            rounded={"xl"}
            p={4}
            my={4}
        >
            <HStack gap={3} mb={4} justify={"space-between"}>
                <HStack gap={3}>
                    <Avatar
                        name={name}
                        src={link}
                        size={"lg"}
                        shadow={"xl"}
                        cursor={"pointer"}
                    />
                    <Stack justify={"center"}>
                        <Heading fontSize={"xl"} mb={-2}>
                            {name}
                        </Heading>
                        <Box
                            __css={{
                                "& *": {
                                    fontSize: "19px",
                                },
                            }}
                        >
                            <StarRatingComponent
                                name="Rating"
                                editing={false}
                                starCount={5}
                                value={rating}
                            />
                        </Box>
                    </Stack>
                </HStack>
            </HStack>
            <Box>
                <Text fontSize={"xl"}>{message}</Text>
            </Box>
            <HStack align={"center"} justify={"end"} mt={4}>
                <Text fontSize={"xl"} color={"gray.600"}>
                    <Icon as={BiCalendar} mt={"1"} />
                </Text>
                <Text fontSize={"xl"} color={"gray.600"}>
                    {formatDate(date)}
                </Text>
            </HStack>
        </Box>
    );
}

WatchCoursePage.layout = "watchcourse";

export default WatchCoursePage;
