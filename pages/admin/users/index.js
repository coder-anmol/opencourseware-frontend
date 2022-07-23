import {
    Box,
    Button,
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
    AspectRatio,
    HStack,
} from "@chakra-ui/react";
import Axios from "utils/fetcher";
import { useEffect, useState } from "react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import Pagination from "@/components/Pagination";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import swal from "@sweetalert/with-react";
import Link from "next/link";
import { formatDate, formatRole } from "utils/tools";
import { useRouter } from "next/router";
import EmptyData from "@/components/EmptyData";
import MyButton from "@/components/Button";

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});

    const router = useRouter();

    const deleteUser = (id) => {
        setLoading(true);
        Axios.delete(`users/${id}`)
            .then((res) => {
                swal({
                    title: "User Deleted",
                    icon: "success",
                    text: "User is deleted successfully",
                    type: "success",
                });

                const { page = 1 } = router.query;
                Axios.get(`users?page=${page}`).then((res) => {
                    setPagination(res.data.pagination);
                    setUsers(res.data.results);
                    setLoading(false);
                });
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Delete Action Failed",
                    text: `Unable to delete user`,
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        const { page = 1 } = router.query;
        Axios.get(`users?page=${page}`)
            .then((res) => {
                setPagination(res.data.pagination);
                setUsers(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Page Fetching Failed",
                    text: `Unable to fetch page no ${router.query.page} data`,
                });
                router.push("/admin/users?page=1");
            });
    }, [router.query.page]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <Box>
                    {/* Table Heading */}
                    <Box>
                        <Heading size={"xl"} mb={"4"}>
                            Users
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
                                        <Th>Role</Th>
                                        <Th>Created On</Th>
                                        <Th isNumeric>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map((user) => {
                                        const {
                                            id,
                                            name,
                                            email,
                                            profile_image,
                                            is_admin,
                                            is_teacher,
                                            is_student,
                                            created_on,
                                        } = user;
                                        return (
                                            <Tr key={id}>
                                                <Td>{id}</Td>
                                                <Td>{name}</Td>
                                                <Td>{email}</Td>
                                                <Td py={"3 !important"}>
                                                    <Avatar
                                                        name={name}
                                                        src={profile_image}
                                                        size={"md"}
                                                    />
                                                </Td>
                                                <Td>
                                                    {formatRole(
                                                        is_student,
                                                        is_teacher,
                                                        is_admin
                                                    )}
                                                </Td>
                                                <Td>
                                                    {formatDate(created_on)}
                                                </Td>
                                                <Td isNumeric>
                                                    <Box
                                                        display={"flex"}
                                                        justifyContent={"end"}
                                                        alignItems={"center"}
                                                        gap={"3"}
                                                    >
                                                        <Icon
                                                            fontSize={"2xl"}
                                                            cursor={"pointer"}
                                                            color={"warning"}
                                                            as={HiPencilAlt}
                                                            onClick={() => {
                                                                router.push(
                                                                    `/admin/users/edit/${id}`
                                                                );
                                                            }}
                                                        />
                                                        <Icon
                                                            fontSize={"2xl"}
                                                            cursor={"pointer"}
                                                            color={"danger"}
                                                            as={HiTrash}
                                                            onClick={() => {
                                                                deleteUser(id);
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
                                />
                            </Box>
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!users.length} />

                    {/* Add User */}
                    <HStack justify={"end"} my={4}>
                        <Link href={"/admin/users/add"}>
                            <MyButton>Add User</MyButton>
                        </Link>
                    </HStack>
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "admin";
export default Index;
