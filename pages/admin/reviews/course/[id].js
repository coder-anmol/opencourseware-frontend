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
    const [reviews, setReviews] = useState([]);

    const router = useRouter();

    useEffect(() => {
        Axios.get(`course-review/all/`)
            .then((res) => {
                console.log("Result: ", res.data);
                // const _reviews = res.data.results;
                // const filteredReviews = _reviews.filter(
                //     (review) => review.course.id == router.query.id
                // );
                // console.log(_reviews);
                // console.log(filteredReviews);
                // setReviews(filteredReviews);
                setLoading(false);
            })

            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Data Fetching Failed",
                    text: "Unable to fetch user's data",
                });
                router.push("/admin/courses");
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
                            Reviews
                        </Heading>
                    </Box>

                    {/* Table Data */}
                    {!!reviews.length && (
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
                                        <Th>Feedback</Th>
                                        <Th>Student</Th>
                                        <Th>Rating</Th>
                                        <Th>Created On</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {reviews.map((review) => {
                                        return (
                                            <Tr key={review.id}>
                                                <Td>{review.id}</Td>
                                                <Td
                                                    _hover={{
                                                        color: "primary",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {formatCourseName(
                                                        review.feedback,
                                                        60
                                                    )}
                                                </Td>
                                                <Td py={"3 !important"}>
                                                    <Link
                                                        href={`/admin/users/preview/${review.student[0].id}`}
                                                    >
                                                        <Avatar
                                                            name={String(
                                                                review
                                                                    .student[0]
                                                                    .name
                                                            )}
                                                            src={
                                                                review
                                                                    .student[0]
                                                                    .profile_image
                                                            }
                                                            cursor={"pointer"}
                                                            size={"md"}
                                                        />
                                                    </Link>
                                                </Td>
                                                <Td>{review.rating}</Td>
                                                <Td isNumeric>
                                                    {formatDate(
                                                        review.created_on
                                                    )}
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!reviews.length} />

                    {/* Add Course */}
                    {/* <HStack justify={"end"} my={4}>
                        <Link href={"/admin/courses/add"}>
                            <MyButton>Add Course</MyButton>
                        </Link>
                    </HStack> */}
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "admin";
export default Index;
