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

    function fetchData() {
        const { page = 1 } = router.query;
        Axios.get(`course/all-teacher?page=${page}`)
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
                router.push("/teacher/courses?page=1");
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
                                        <Th>Category</Th>
                                        <Th>Status</Th>
                                        <Th>Created On</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {courses.map((course) => {
                                        const {
                                            id,
                                            course_name,
                                            category,
                                            course_status,
                                            created_on,
                                        } = course;
                                        return (
                                            <Tr key={id}>
                                                <Td>{id}</Td>
                                                <Link
                                                    href={`/teacher/courses/preview/${id}`}
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
                                    baseUrl={"/teacher/courses"}
                                />
                            </Box>
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!courses.length} />

                    {/* Add Course */}
                    <HStack justify={"end"} my={4}>
                        <Link href={"/teacher/courses/add"}>
                            <MyButton>Add Course</MyButton>
                        </Link>
                    </HStack>
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "teacher";
export default Index;
