import {
    Heading,
    Box,
    Container,
    Stack,
    HStack,
    Button,
    Select,
    Input,
} from "@chakra-ui/react";
import PrimaryButton from "./Button";
import CategoryCard from "@/components/Card/category";
import CoursePreviewCard from "./Card/coursepreview";
import Link from "next/link";

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
                        <Stack py={{ base: "8", lg: "12" }}>
                            <Heading fontSize={{ base: "3xl", lg: "4xl" }}>
                                Welcome To OpenCourseWare
                            </Heading>
                        </Stack>
                    </Container>
                </Box>
            </Box>
            <Box>
                <Container maxW={"container.xxl"}>
                    {/* Categories */}
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
                            Categories
                        </Heading>

                        {/* current course */}
                        <HStack wrap={"wrap"} gap={"4"}>
                            <Link href={"/"}>
                                <a>
                                    <CategoryCard>React.JS</CategoryCard>
                                </a>
                            </Link>
                            <Link href={"/"}>
                                <a>
                                    <CategoryCard>Next.JS</CategoryCard>
                                </a>
                            </Link>
                            <Link href={"/"}>
                                <a>
                                    <CategoryCard>Python</CategoryCard>
                                </a>
                            </Link>
                            <Link href={"/"}>
                                <a>
                                    <CategoryCard>JavaScript</CategoryCard>
                                </a>
                            </Link>
                            <Link href={"/"}>
                                <a>
                                    <CategoryCard>Data Structures</CategoryCard>
                                </a>
                            </Link>
                        </HStack>
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
                            Courses
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
                                <SearchCourses />
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

                        <HStack
                            justify={"space-between"}
                            align={"center"}
                            mt={{ base: "5" }}
                            mb={{ base: "2" }}
                        >
                            <HStack gap={{ base: "2" }} align={"center"}>
                                <SearchCourses lg={false} />
                            </HStack>
                        </HStack>

                        {/* current course */}
                        <Stack gap={4} py={3}>
                            <CoursePreviewCard />
                            <CoursePreviewCard />
                            <CoursePreviewCard />
                            <CoursePreviewCard />
                            <CoursePreviewCard />
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

const SearchCourses = ({ lg = true }) => {
    if (lg) {
        return (
            <HStack display={{ base: "none", lg: "block" }} align={"center"}>
                <Input
                    placeholder="Search Courses"
                    size={"lg"}
                    focusBorderColor={"primary"}
                    width={{ lg: "400px" }}
                />
                <PrimaryButton>Search</PrimaryButton>
            </HStack>
        );
    } else {
        return (
            <Box
                display={{ base: "grid", lg: "none" }}
                gridTemplateColumns={"7fr 3fr"}
                gap={"2"}
            >
                <Stack>
                    <Input
                        placeholder="Search Courses"
                        size={"lg"}
                        focusBorderColor={"primary"}
                    />
                </Stack>
                <PrimaryButton>Search</PrimaryButton>
            </Box>
        );
    }
};

export default UserDashboard;
