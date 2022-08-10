import {
    Heading,
    Input,
    RadioGroup,
    Text,
    FormLabel,
    FormControl,
    FormErrorMessage,
    HStack,
    Textarea,
    Avatar,
    Box,
} from "@chakra-ui/react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Formik, Form, Field } from "formik";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactStars from "react-rating-stars-component";

const Preview = () => {
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (router.query.id) {
            Axios.get(`course-review/${router.query.id}/`)
                .then((res) => {
                    setReview(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: "Unable to fetch review's data",
                    });
                    router.push("/teacher/reviews");
                });
        }
    }, [router.query.id]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            {!loading && (
                <AdminWrapper show={!loading}>
                    <Heading fontSize={"3xl"} mb={6}>
                        Review
                    </Heading>
                    <HStack justify={{ base: "center", lg: "left" }}>
                        <Avatar
                            name={review.student[0].name}
                            src={review.student[0].profile_image}
                            size={"2xl"}
                            shadow={"xl"}
                            cursor={"pointer"}
                        />
                    </HStack>
                    <Box>
                        <Box mb={6} mt={2}>
                            <ReactStars
                                count={5}
                                size={30}
                                isHalf={true}
                                activeColor="#ffd700"
                                value={review.rating}
                                edit={false}
                            />
                        </Box>
                        <Text fontSize={"2xl"}>{review.feedback}</Text>
                    </Box>
                </AdminWrapper>
            )}
        </>
    );
};

Preview.layout = "teacher";
export default Preview;
