import Button from "@/components/Button";
import {
    Container,
    Box,
    Heading,
    Text,
    AspectRatio,
    Stack,
    Icon,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    HStack,
    Avatar,
} from "@chakra-ui/react";
import Image from "next/image";
import { BiVideo } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "utils/fetcher";
import Loader from "@/components/Loader";
import useStore from "store";
import { formatRole } from "utils/tools";

const CoursePreview = () => {
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const userData = useStore((state) => state.userData);
    const router = useRouter();

    function handleEnrollNow() {
        if (userData) {
            console.log("Logged In");
            if (
                formatRole(
                    userData.is_student,
                    userData.is_teacher,
                    userData.is_admin
                ) == "Student"
            ) {
                const data = {
                    student: [userData.id],
                    course: [router.query.id],
                };
                Axios.post("course-enroll/", data)
                    .then((res) => {
                        swal({
                            icon: "success",
                            title: "Congratulations !!",
                            text: "You have successfully enrolled in a course",
                        });
                        router.push("/");
                    })
                    .catch((err) => {
                        swal({
                            icon: "error",
                            title: "Error",
                            text: "Unable to enroll in a course, may be you are already enrolled",
                        });
                    });
            } else {
                swal({
                    icon: "error",
                    title: "Oops !!",
                    text: "You are not a student",
                });
            }
        } else {
            swal({
                icon: "error",
                title: "Oops !!",
                text: "You are not logged in",
            });
            router.push("/login");
        }
    }

    useEffect(() => {
        if (router.query.id) {
            Axios.get(`course/${router.query.id}/`)
                .then((res) => {
                    setCourse(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: "Unable to fetch course data",
                    });
                    router.push("/courses");
                });
        }
    }, [router.query.id]);
    return (
        <>
            {loading && <Loader isLoading={loading} />}

            {!loading && (
                <Container maxW={"container.xxl"}>
                    <Box
                        display={{ lg: "flex" }}
                        gap={{ lg: "4" }}
                        mt={{ base: "24", lg: "32" }}
                        mb={{ base: "20", lg: "28" }}
                        p={"4"}
                        rounded={"3xl"}
                        bg={"white"}
                        shadow={"2xl"}
                    >
                        {/* left */}
                        <Box
                            p={"4"}
                            rounded={"3xl"}
                            bg={"white"}
                            border={"1px"}
                            borderColor={"gray.200"}
                            shadow={"lg"}
                            w={"100%"}
                        >
                            {/* course information */}
                            <Box>
                                <Heading
                                    size={{ base: "lg", sm: "xl" }}
                                    noOfLines={"2"}
                                    textTransform={"capitalize"}
                                    mb={2}
                                >
                                    {course.course_name}
                                </Heading>
                            </Box>

                            {/* course card */}
                            <Box display={{ lg: "none" }}>
                                <CourseCard
                                    cover={course.cover_image}
                                    lessons={course.section.length}
                                    handleEnrollNow={handleEnrollNow}
                                />
                            </Box>

                            {/* Syllabus  */}
                            <Box>
                                {/* syllabus accordian */}
                                <Box mt={"6"}>
                                    <Heading size={{ base: "lg", sm: "xl" }}>
                                        Syllabus
                                    </Heading>

                                    <Box mt={"3"}>
                                        <Accordion
                                            border={"1px"}
                                            rounded={"xl"}
                                            borderColor={"gray.200"}
                                            overflow={"hidden"}
                                            allowToggle
                                        >
                                            {course.section.map(
                                                (section, i) => {
                                                    return (
                                                        <AccordionItem
                                                            {...(i == 0 && {
                                                                borderTop:
                                                                    "0px",
                                                            })}
                                                            {...(i ==
                                                                course.section
                                                                    .length -
                                                                    1 && {
                                                                borderBottom:
                                                                    "0px",
                                                            })}
                                                            key={i}
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
                                                                        gap={
                                                                            "2"
                                                                        }
                                                                        alignItems={
                                                                            "flex-start"
                                                                        }
                                                                    >
                                                                        <Text
                                                                            fontSize={
                                                                                "xl"
                                                                            }
                                                                        >
                                                                            {i +
                                                                                1}
                                                                        </Text>
                                                                        <Box>
                                                                            <Text
                                                                                fontSize={
                                                                                    "xl"
                                                                                }
                                                                            >
                                                                                {
                                                                                    section.section_tittle
                                                                                }
                                                                            </Text>
                                                                            <Text
                                                                                fontSize={
                                                                                    "md"
                                                                                }
                                                                                color={
                                                                                    "gray.600"
                                                                                }
                                                                            >
                                                                                {
                                                                                    section
                                                                                        .video
                                                                                        .length
                                                                                }{" "}
                                                                                Videos
                                                                            </Text>
                                                                        </Box>
                                                                    </HStack>
                                                                    <AccordionIcon />
                                                                </AccordionButton>
                                                            </h2>
                                                            <AccordionPanel
                                                                p={0}
                                                            >
                                                                <Box>
                                                                    {section.video.map(
                                                                        (
                                                                            video,
                                                                            i
                                                                        ) => {
                                                                            return (
                                                                                <HStack
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    flex="1"
                                                                                    textAlign="left"
                                                                                    gap={
                                                                                        "2"
                                                                                    }
                                                                                    alignItems={
                                                                                        "flex-start"
                                                                                    }
                                                                                    cursor={
                                                                                        "pointer"
                                                                                    }
                                                                                    py={
                                                                                        3
                                                                                    }
                                                                                    px={
                                                                                        4
                                                                                    }
                                                                                    _hover={{
                                                                                        bg: "blackAlpha.50",
                                                                                    }}
                                                                                    borderTop={
                                                                                        "1px"
                                                                                    }
                                                                                    borderColor={
                                                                                        "gray.200"
                                                                                    }
                                                                                    transitionProperty={
                                                                                        "var(--chakra-transition-property-common)"
                                                                                    }
                                                                                    transitionDuration={
                                                                                        "var(--chakra-transition-duration-normal)"
                                                                                    }
                                                                                >
                                                                                    <Text
                                                                                        fontSize={
                                                                                            "xl"
                                                                                        }
                                                                                    >
                                                                                        <Icon
                                                                                            as={
                                                                                                BiVideo
                                                                                            }
                                                                                        />
                                                                                    </Text>
                                                                                    <Box>
                                                                                        <Text
                                                                                            fontSize={
                                                                                                "xl"
                                                                                            }
                                                                                            textTransform={
                                                                                                "capitalize"
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                video.video_title
                                                                                            }
                                                                                        </Text>
                                                                                        <Text
                                                                                            fontSize={
                                                                                                "md"
                                                                                            }
                                                                                            color={
                                                                                                "gray.600"
                                                                                            }
                                                                                        >
                                                                                            Video
                                                                                        </Text>
                                                                                    </Box>
                                                                                </HStack>
                                                                            );
                                                                        }
                                                                    )}
                                                                </Box>
                                                            </AccordionPanel>
                                                        </AccordionItem>
                                                    );
                                                }
                                            )}
                                        </Accordion>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Author section */}
                            <Box mt={6}>
                                {/* author card: use previous */}
                                <Heading
                                    size={{ base: "lg", sm: "xl" }}
                                    mb={3}
                                    mt={{ base: "3", lg: "14" }}
                                >
                                    Author
                                </Heading>
                                <Stack>
                                    <Link href={"/profile"}>
                                        <HStack>
                                            <Avatar
                                                name={course.teacher.name}
                                                src={
                                                    course.teacher.profile_image
                                                }
                                                bg={"primary"}
                                                size={{ base: "md", sm: "lg" }}
                                            />

                                            <Text
                                                color={"gray.800"}
                                                fontSize={{
                                                    sm: "xl",
                                                    md: "2xl",
                                                }}
                                                noOfLines={{ base: 1 }}
                                                fontWeight={"bold"}
                                                textTransform={"capitalize"}
                                            >
                                                {course.teacher.name}
                                            </Text>
                                        </HStack>
                                    </Link>
                                    <Box>
                                        <Text
                                            fontSize={{ sm: "lg", md: "xl" }}
                                            noOfLines={"10"}
                                        >
                                            {course.teacher.bio}
                                        </Text>
                                    </Box>
                                </Stack>

                                {/* about course card */}
                            </Box>

                            {/* About Section */}
                            <Box my={6}>
                                {/* author card: use previous */}
                                <Heading
                                    size={{ base: "lg", sm: "xl" }}
                                    mb={3}
                                    mt={{ base: "3", lg: "14" }}
                                >
                                    About This Course
                                </Heading>
                                <Stack>
                                    <Box>
                                        <Text
                                            fontSize={{ sm: "lg", md: "xl" }}
                                            noOfLines={"10"}
                                        >
                                            {course.description}
                                        </Text>
                                    </Box>
                                </Stack>

                                {/* about course card */}
                            </Box>
                        </Box>

                        {/* right */}
                        <Box
                            display={{ base: "none", lg: "block" }}
                            minW={{ lg: "320px", xl: "400px" }}
                        >
                            <CourseCard
                                cover={course.cover_image}
                                lessons={course.section.length}
                                handleEnrollNow={handleEnrollNow}
                            />
                        </Box>
                    </Box>
                </Container>
            )}
        </>
    );
};

function CourseCard({ cover, lessons, handleEnrollNow }) {
    return (
        <Stack
            p={"4"}
            border={"1px"}
            rounded={"xl"}
            borderColor={"gray.200"}
            shadow={"lg"}
        >
            <Stack gap={"2"}>
                {/* image */}
                <AspectRatio
                    position={"relative"}
                    ratio={"16/9"}
                    w={"100%"}
                    h={{
                        base: "220px",
                        sm: "260px",
                        md: "360px",
                        lg: "250px",
                        xl: "280px",
                    }}
                    rounded={"xl"}
                    overflow={"hidden"}
                >
                    <Image
                        src={cover}
                        layout={"fill"}
                        objectFit={"cover"}
                        alt={"Course Cover"}
                    />
                </AspectRatio>

                {/* button */}
                <Button w={"100%"} onClick={handleEnrollNow}>
                    Enroll Now
                </Button>

                {/* other info */}
                <Box pt={"2"}>
                    <Text fontWeight={"bold"}>{"What's included"}</Text>
                    <Text display={"flex"} alignItems={"center"} gap={"2"}>
                        <Icon as={FaPlus} /> {lessons} Lessons
                    </Text>
                </Box>
            </Stack>
        </Stack>
    );
}

export default CoursePreview;
