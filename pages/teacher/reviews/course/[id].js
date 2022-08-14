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
    const [reviews, setReviews] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            const { page = 1 } = router.query;
            Axios.get(`course-review/all/${router.query.id}?page=${page}`)
                .then((res) => {
                    setReviews(res.data.results);
                    setPagination(res.data.pagination);
                    setLoading(false);
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: "Unable to fetch reviews data",
                    });
                    router.push("/teacher/reviews");
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
                                                <Link
                                                    href={`/teacher/reviews/course/preview/${review.id}`}
                                                >
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
                                                </Link>
                                                <Td py={"3 !important"}>
                                                    <Avatar
                                                        name={String(
                                                            review.student[0]
                                                                .name
                                                        )}
                                                        src={
                                                            review.student[0]
                                                                .profile_image
                                                        }
                                                        cursor={"pointer"}
                                                        size={"md"}
                                                    />
                                                </Td>
                                                <Td>{review.rating}</Td>
                                                <Td>
                                                    {formatDate(
                                                        review.created_on
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
                                    baseUrl={`/teacher/reviews/course/${router.query.id}`}
                                />
                            </Box>
                        </TableContainer>
                    )}

                    {/* empty data */}
                    <EmptyData show={!reviews.length} />
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "teacher";
export default Index;
