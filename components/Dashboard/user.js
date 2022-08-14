import {
    Heading,
    Box,
    Container,
    Stack,
    HStack,
    Select,
    Button,
} from "@chakra-ui/react";
import Link from "next/link";
import CourseCard from "../Card/course";
import EmptyData from "../EmptyData";
import CustomButton from "../Button";

const UserDashboard = ({ enrollments, user, currentCourse }) => {
    return (
        <Box my={{ base: "24", lg: "28" }}>
            <Box
                bg={
                    "linear-gradient(90deg, hsla(212, 98%, 52%, 1) 0%, hsla(206, 98%, 52%, 1) 33%, hsla(195, 98%, 52%, 1) 66%, hsla(185, 98%, 52%, 1) 100%)"
                }
                color={"white"}
                mb={"6"}
                shadow={"xl"}
            >
                <Box>
                    <Container maxW={"container.xxl"}>
                        {/* Welcome, Heading */}
                        <Stack py={{ base: "5", lg: "8" }}>
                            <Heading
                                fontSize={{ base: "xl", lg: "2xl" }}
                                mb={{ base: "3", lg: "6" }}
                                textTransform={"capitalize"}
                            >
                                Hi, {user.name},
                            </Heading>
                            <Heading fontSize={{ base: "2xl", lg: "4xl" }}>
                                OpenCourseWare
                            </Heading>
                        </Stack>
                    </Container>
                </Box>
            </Box>
            <Box>
                <Container maxW={"container.xxl"}>
                    {/* Current Learning */}

                    {currentCourse.visible && (
                        <Box
                            mb={{ base: "6" }}
                            px={{ base: "3", sm: "4", md: "5", lg: "6" }}
                            py={{ base: "3", sm: "4", md: "5", lg: "6" }}
                            rounded={"xl"}
                            shadow={"xl"}
                            bg={"white"}
                        >
                            <Heading
                                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                                mb={{
                                    base: "1",
                                    sm: "3",
                                    md: "4",
                                    lg: "6",
                                }}
                            >
                                Continue Learning
                            </Heading>

                            <Stack gap={4} py={3}>
                                <CourseCard enrollment={currentCourse.course} />
                            </Stack>
                        </Box>
                    )}

                    {/* Enrolled Courses */}
                    <Box
                        mb={{ base: "6" }}
                        px={{ base: "3", sm: "4", md: "5", lg: "6" }}
                        py={{ base: "3", sm: "4", md: "5", lg: "6" }}
                        rounded={"xl"}
                        shadow={"xl"}
                        bg={"white"}
                    >
                        <Heading
                            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                            mb={{
                                base: "1",
                                sm: "3",
                                md: "4",
                                lg: "6",
                            }}
                        >
                            My Enrollments
                        </Heading>

                        <HStack
                            justify={"space-between"}
                            align={"center"}
                            mt={{ base: "5" }}
                            mb={{ base: "2" }}
                        >
                            <HStack gap={{ base: "2" }} align={"center"}>
                                <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                                    All
                                </Heading>
                                <Button
                                    w={"30px"}
                                    h={"30px"}
                                    p={"5"}
                                    rounded={"full"}
                                >
                                    {enrollments.length}
                                </Button>
                            </HStack>
                        </HStack>

                        {/* current course */}
                        <Stack gap={4} py={3}>
                            {!enrollments.length && (
                                <>
                                    <EmptyData show={true} />
                                </>
                            )}

                            {/* if enrollments exists */}
                            {enrollments.map((enrollment, i) => {
                                return (
                                    <CourseCard
                                        key={i}
                                        enrollment={enrollment}
                                    />
                                );
                            })}

                            <HStack justify={"end"} pt={8}>
                                <Link href={"/courses"}>
                                    <CustomButton>Explore Courses</CustomButton>
                                </Link>
                            </HStack>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default UserDashboard;
