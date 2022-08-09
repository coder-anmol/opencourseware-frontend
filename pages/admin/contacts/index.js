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
    const [contacts, setContacts] = useState([]);
    const [pagination, setPagination] = useState({});

    const router = useRouter();

    const deleteContact = (id) => {
        setLoading(true);
        Axios.delete(`contact-us/${id}/`)
            .then((res) => {
                swal({
                    title: "Contact Deleted",
                    icon: "success",
                    text: "Contact is deleted successfully",
                    type: "success",
                });

                const { page = 1 } = router.query;
                Axios.get(`contact-us/all/?page=${page}`).then((res) => {
                    setPagination(res.data.pagination);
                    setContacts(res.data.results);
                    setLoading(false);
                });
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Delete Action Failed",
                    text: `Unable to delete contact`,
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        const { page = 1 } = router.query;
        Axios.get(`contact-us/all/?page=${page}`)
            .then((res) => {
                setPagination(res.data.pagination);
                setContacts(res.data.results);
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
                            Contacts
                        </Heading>
                    </Box>

                    {/* Table Data */}
                    {!!contacts.length && (
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
                                        <Th isNumeric>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {contacts.map((contact) => {
                                        const { id, name, email } = contact;
                                        return (
                                            <Tr key={id}>
                                                <Td>{id}</Td>
                                                <Link
                                                    href={`/admin/contacts/preview/${id}`}
                                                >
                                                    <Td
                                                        cursor={"pointer"}
                                                        _hover={{
                                                            color: "primary",
                                                        }}
                                                    >
                                                        {name}
                                                    </Td>
                                                </Link>
                                                <Td>{email}</Td>
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
                                                            color={"danger"}
                                                            as={HiTrash}
                                                            onClick={() => {
                                                                deleteContact(
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
                                    baseUrl={"/admin/contacts"}
                                />
                            </Box>
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!contacts.length} />
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "admin";
export default Index;
