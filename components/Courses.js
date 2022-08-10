import {
    Heading,
    Box,
    Container,
    Stack,
    HStack,
    Button,
    Input,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import PrimaryButton from "./Button";
import CategoryCard from "@/components/Card/category";
import CoursePreviewCard from "./Card/coursepreview";
import { useState } from "react";
import Link from "next/link";
import EmptyData from "./EmptyData";

const Courses = ({ categories, courses }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourses, setSelectedCourses] = useState(courses);

    function handleSearchInput(e) {
        setSearchQuery(e.target.value);
    }

    function filterCourses(_courses, query) {
        const filteredCourses = _courses.filter((course) => {
            return (
                course.course_name.toLowerCase() +
                " " +
                course.description.toLowerCase() +
                " " +
                course.category.category_name.toLowerCase() +
                " " +
                course.teacher.name.toLowerCase()
            ).includes(query);
        });
        return filteredCourses;
    }

    function searchCourses() {
        const query = searchQuery.toLowerCase();
        const result = filterCourses(courses, query);
        setSelectedCourses(result);
    }

    function handleCategorySearch(categoryName) {
        const query = categoryName.toLowerCase();
        const result = filterCourses(courses, query);
        setSelectedCourses(result);
    }

    return (
        <>
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
                                fontSize={{
                                    base: "2xl",
                                    md: "3xl",
                                    lg: "4xl",
                                }}
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
                            <HStack>
                                <Wrap spacing={"3"} py={2}>
                                    <WrapItem>
                                        <CategoryCard
                                            onClick={() => {
                                                handleCategorySearch("");
                                            }}
                                        >
                                            All
                                        </CategoryCard>
                                    </WrapItem>
                                    {categories.map((category) => {
                                        return (
                                            <WrapItem key={category.id}>
                                                <CategoryCard
                                                    onClick={() => {
                                                        handleCategorySearch(
                                                            category.category_name
                                                        );
                                                    }}
                                                >
                                                    {category.category_name}
                                                </CategoryCard>
                                            </WrapItem>
                                        );
                                    })}
                                </Wrap>
                            </HStack>
                        </Box>

                        {/*Courses */}
                        <Box
                            mb={{ base: "6" }}
                            px={{ base: "3", sm: "4", md: "5", lg: "6" }}
                            py={{ base: "3", sm: "4", md: "5", lg: "6" }}
                            rounded={"xl"}
                            shadow={"xl"}
                            bg={"white"}
                        >
                            <Heading
                                fontSize={{
                                    base: "2xl",
                                    md: "3xl",
                                    lg: "4xl",
                                }}
                                mb={{
                                    base: "1",
                                    sm: "3",
                                    md: "4",
                                    lg: "6",
                                }}
                            >
                                Courses
                            </Heading>

                            <Box>
                                <HStack
                                    justify={"space-between"}
                                    align={"center"}
                                    mt={{ base: "5" }}
                                    mb={{ base: "2" }}
                                >
                                    <HStack
                                        gap={{ base: "2" }}
                                        align={"center"}
                                    >
                                        <Heading
                                            fontSize={{
                                                base: "2xl",
                                                md: "3xl",
                                            }}
                                        >
                                            All
                                        </Heading>
                                        <Button
                                            w={"30px"}
                                            h={"30px"}
                                            p={"5"}
                                            rounded={"full"}
                                        >
                                            {courses.length}
                                        </Button>
                                    </HStack>
                                    <SearchCourses
                                        value={searchQuery}
                                        changeHandler={handleSearchInput}
                                        searchHandler={searchCourses}
                                    />
                                </HStack>

                                <HStack
                                    justify={"space-between"}
                                    align={"center"}
                                    mt={{ base: "5" }}
                                    mb={{ base: "2" }}
                                >
                                    <HStack
                                        gap={{ base: "2" }}
                                        align={"center"}
                                    >
                                        <SearchCourses
                                            lg={false}
                                            value={searchQuery}
                                            changeHandler={handleSearchInput}
                                            searchHandler={searchCourses}
                                        />
                                    </HStack>
                                </HStack>

                                {/* course */}
                                <Stack gap={4} py={3}>
                                    {selectedCourses.map((course, i) => {
                                        return (
                                            <Link
                                                href={`/courses/preview/${course.id}`}
                                                key={i}
                                            >
                                                <a>
                                                    <CoursePreviewCard
                                                        title={
                                                            course.course_name
                                                        }
                                                        description={
                                                            course.description
                                                        }
                                                        category={
                                                            course.category
                                                                .category_name
                                                        }
                                                        coverImage={
                                                            course.cover_image
                                                        }
                                                        teacherId={
                                                            course.teacher.id
                                                        }
                                                        teacherName={
                                                            course.teacher.name
                                                        }
                                                        teacherProfile={
                                                            course.teacher
                                                                .profile_image
                                                        }
                                                    />
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </Stack>

                                <Box py={4}>
                                    {!selectedCourses.length && (
                                        <EmptyData
                                            show={true}
                                            value={"No Courses Found"}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

const SearchCourses = ({ lg = true, value, changeHandler, searchHandler }) => {
    if (lg) {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    searchHandler();
                }}
            >
                <HStack
                    display={{ base: "none", lg: "block" }}
                    align={"center"}
                >
                    <Input
                        placeholder="Search Courses"
                        size={"lg"}
                        focusBorderColor={"primary"}
                        width={{ lg: "400px" }}
                        value={value}
                        onChange={changeHandler}
                    />
                    <PrimaryButton type="submit">Search</PrimaryButton>
                </HStack>
            </form>
        );
    } else {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    searchHandler();
                }}
            >
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
                            value={value}
                            onChange={changeHandler}
                        />
                    </Stack>
                    <PrimaryButton type={"submit"}>Search</PrimaryButton>
                </Box>
            </form>
        );
    }
};

export default Courses;
