import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
    Icon,
    Avatar,
    HStack,
} from "@chakra-ui/react";
import Axios from "utils/fetcher";
import { useEffect, useState } from "react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import Pagination from "@/components/Pagination";
import { HiPencilAlt, HiTrash, HiCheck } from "react-icons/hi";
import swal from "@sweetalert/with-react";
import Link from "next/link";
import { formatDate, formatCourseName } from "utils/tools";
import { useRouter } from "next/router";
import EmptyData from "@/components/EmptyData";
import MyButton from "@/components/Button";

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [pagination, setPagination] = useState({});

    const router = useRouter();

    const deleteCourse = (id) => {
        setLoading(true);
        Axios.delete(`course/${id}`)
            .then((res) => {
                swal({
                    title: "Course Deleted",
                    icon: "success",
                    text: "Course is deleted successfully",
                    type: "success",
                });

                const { page = 1 } = router.query;
                Axios.get(`course/all?page=${page}`).then((res) => {
                    setPagination(res.data.pagination);
                    setCourses(res.data.results);
                    setLoading(false);
                });
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Delete Action Failed",
                    text: `Unable to delete course`,
                });
                setLoading(false);
            });
    };

    function fetchData() {
        const { page = 1 } = router.query;
        Axios.get(`course/all?page=${page}`)
            .then((res) => {
                setPagination(res.data.pagination);
                setCourses(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Page Fetching Failed",
                    text: `Unable to fetch page no ${router.query.page} data`,
                });
                router.push("/admin/courses?page=1");
            });
    }

    function changeCourseStatus(id) {
        const data = {
            course_status: "published",
        };

        Axios.patch(`course/change-status/${id}/`, data)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Course is published successfully",
                    type: "success",
                });
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to publish course",
                    type: "error",
                });
            });
    }

    useEffect(() => {
        fetchData();
    }, [router.query.page]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <Box>
                    {/* Table Heading */}
                    <Box>
                        <Heading size={"xl"} mb={"4"}>
                            Courses
                        </Heading>
                    </Box>

                    {/* Table Data */}
                    {!!courses.length && (
                        <TableContainer
                            border={"1px"}
                            borderColor={"gray.200"}
                            rounded={"xl"}
                        >
                            <Table
                                variant="striped"
                                size={{ base: "md", md: "lg" }}
                            >
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Course Name</Th>
                                        <Th>Author</Th>
                                        <Th>Category</Th>
                                        <Th>Status</Th>
                                        <Th>Created On</Th>
                                        <Th>Total Videos</Th>
                                        {/* <Th>Total Duration</Th> */}
                                        <Th isNumeric>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {courses.map((course) => {
                                        const {
                                            id,
                                            course_name,
                                            teacher,
                                            category,
                                            course_status,
                                            created_on,
                                            total_videos,
                                            total_duration,
                                        } = course;
                                        return (
                                            <Tr key={id}>
                                                <Td>{id}</Td>
                                                <Link
                                                    href={`/admin/courses/preview/${id}`}
                                                >
                                                    <Td
                                                        _hover={{
                                                            color: "primary",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        {formatCourseName(
                                                            course_name,
                                                            60
                                                        )}
                                                    </Td>
                                                </Link>
                                                <Td py={"3 !important"}>
                                                    <Link
                                                        href={`/admin/users/preview/${teacher.id}`}
                                                    >
                                                        <Avatar
                                                            name={String(
                                                                teacher.name
                                                            )}
                                                            src={
                                                                teacher.profile_image
                                                            }
                                                            cursor={"pointer"}
                                                            size={"md"}
                                                        />
                                                    </Link>
                                                </Td>
                                                <Td>
                                                    {category.category_name}
                                                </Td>
                                                <Td
                                                    textTransform={"capitalize"}
                                                >
                                                    {course_status}
                                                </Td>
                                                <Td>
                                                    {formatDate(created_on)}
                                                </Td>
                                                <Td>{total_videos}</Td>
                                                {/* <Td>{total_duration}</Td> */}
                                                <Td isNumeric>
                                                    <Box
                                                        display={"flex"}
                                                        justifyContent={"end"}
                                                        alignItems={"center"}
                                                        gap={"3"}
                                                    >
                                                        {course_status ==
                                                            "requested" && (
                                                            <Icon
                                                                fontSize={"2xl"}
                                                                cursor={
                                                                    "pointer"
                                                                }
                                                                color={
                                                                    "success"
                                                                }
                                                                as={HiCheck}
                                                                onClick={() => {
                                                                    changeCourseStatus(
                                                                        id
                                                                    );
                                                                    router.push(
                                                                        `/admin/courses/preview/${id}`
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                        <Icon
                                                            fontSize={"2xl"}
                                                            cursor={"pointer"}
                                                            color={"warning"}
                                                            as={HiPencilAlt}
                                                            onClick={() => {
                                                                router.push(
                                                                    `/admin/courses/edit/${id}`
                                                                );
                                                            }}
                                                        />
                                                        <Icon
                                                            fontSize={"2xl"}
                                                            cursor={"pointer"}
                                                            color={"danger"}
                                                            as={HiTrash}
                                                            onClick={() => {
                                                                deleteCourse(
                                                                    id
                                                                );
                                                            }}
                                                        />
                                                    </Box>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                            <Box py={"3"}>
                                <Pagination
                                    count={pagination.count}
                                    current={pagination.current}
                                    next={pagination.next}
                                    previous={pagination.previous}
                                    baseUrl={"/admin/courses"}
                                />
                            </Box>
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!courses.length} />

                    {/* Add Course */}
                    <HStack justify={"end"} my={4}>
                        <Link href={"/admin/courses/add"}>
                            <MyButton>Add Course</MyButton>
                        </Link>
                    </HStack>
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "admin";
export default Index;
