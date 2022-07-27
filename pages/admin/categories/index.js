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
    HStack,
} from "@chakra-ui/react";
import Axios from "utils/fetcher";
import { useEffect, useState } from "react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { HiPencilAlt } from "react-icons/hi";
import swal from "@sweetalert/with-react";
import Link from "next/link";
import { formatDate } from "utils/tools";
import { useRouter } from "next/router";
import EmptyData from "@/components/EmptyData";
import MyButton from "@/components/Button";

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const router = useRouter();

    useEffect(() => {
        Axios.get(`category/all/`)
            .then((res) => {
                setCategories(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Page Fetching Failed",
                    text: `Unable to fetch categories`,
                });
                router.push("/admin");
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
                            Categories
                        </Heading>
                    </Box>

                    {/* Table Data */}
                    {!!categories.length && (
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
                                        <Th>Category Name</Th>
                                        <Th>Created On</Th>
                                        <Th isNumeric>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {categories.map((category) => {
                                        const {
                                            id,
                                            category_name,
                                            created_on,
                                        } = category;
                                        return (
                                            <Tr key={id}>
                                                <Td>{id}</Td>
                                                <Td>{category_name}</Td>
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
                                                                    `/admin/categories/edit/${id}`
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
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!categories.length} />

                    {/* Add category */}
                    <HStack justify={"end"} my={4}>
                        <Link href={"/admin/categories/add"}>
                            <MyButton>Add Category</MyButton>
                        </Link>
                    </HStack>
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "admin";
export default Index;
