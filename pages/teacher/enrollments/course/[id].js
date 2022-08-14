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
    const [pagination, setPagination] = useState({});
    const [users, setUsers] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            const { page = 1 } = router.query;
            Axios.get(`course-enroll/all/${router.query.id}/?page=${page}`)
                .then((res) => {
                    setPagination(res.data.pagination);
                    setUsers(res.data.results);
                    setLoading(false);
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: "Unable to fetch enrolled user's data",
                    });
                    router.push("/teacher/enrollments");
                });
        }
    }, [router.query.page]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <Box>
                    {/* Table Heading */}
                    <Box>
                        <Heading size={"xl"} mb={"4"}>
                            Enrollments
                        </Heading>
                    </Box>

                    {/* Table Data */}
                    {!!users.length && (
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
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        <Th>Profile Image</Th>
                                        <Th>Enrolled On</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map((user) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td>{user.id}</Td>
                                                <Td>{user.student[0].name}</Td>
                                                <Td>{user.student[0].email}</Td>
                                                <Td py={"3 !important"}>
                                                    <Avatar
                                                        name={String(
                                                            user.student[0].name
                                                        )}
                                                        src={
                                                            user.student[0]
                                                                .profile_image
                                                        }
                                                        cursor={"pointer"}
                                                        size={"md"}
                                                    />
                                                </Td>
                                                <Td>
                                                    {formatDate(
                                                        user.created_on
                                                    )}
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
                                    baseUrl={`/teacher/enrollments/course/${router.query.id}`}
                                />
                            </Box>
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!users.length} />
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "teacher";
export default Index;
