import {
    Heading,
    Box,
    Container,
    Stack,
    HStack,
    Button,
    Select,
} from "@chakra-ui/react";
import CourseCard from "../Card/course";

const UserDashboard = () => {
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
                            >
                                Hi, Anmol Sharma,
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

                        {/* current course */}
                        <Stack gap={4} py={3}>
                            <CourseCard />
                        </Stack>
                    </Box>

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
                                    13
                                </Button>
                            </HStack>
                            <Box>
                                <Select
                                    variant="filled"
                                    placeholder="Filter By Category"
                                    fontSize={"lg"}
                                >
                                    <option>Python</option>
                                    <option>JavaScript</option>
                                    <option>C++</option>
                                    <option>Data Structures</option>
                                </Select>
                            </Box>
                        </HStack>

                        {/* current course */}
                        <Stack gap={4} py={3}>
                            <CourseCard />
                            <CourseCard />
                            <CourseCard />
                            <CourseCard />
                            <CourseCard />
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default UserDashboard;
