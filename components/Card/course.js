import {
    AspectRatio,
    Box,
    Heading,
    Stack,
    Text,
    Progress,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ enrollment }) => {
    return (
        <Link href={`/watch/${enrollment.course[0].id}`}>
            <Box
                border={"1px"}
                borderColor={"gray.200"}
                rounded={{ base: "lg", lg: "xl" }}
                p={{ base: 3, sm: "4", md: "6", lg: "8" }}
                shadow={{ base: "md", lg: "lg" }}
                cursor={"pointer"}
                _hover={{ bg: "gray.200" }}
                transition={"all 300ms ease-in-out"}
                userSelect={"none"}
            >
                <Box
                    display={"flex"}
                    gap={{ base: "2", sm: "4", md: "6", lg: "8" }}
                >
                    {/* Image */}
                    <AspectRatio
                        pos={"relative"}
                        ratio={{ base: 1 / 1, lg: 16 / 9 }}
                        w={"35%"}
                        rounded={{ base: "lg", lg: "xl" }}
                        overflow={"hidden"}
                    >
                        <Image
                            alt={"Course Cover"}
                            src={enrollment.course[0].cover_image}
                            layout={"fill"}
                            objectFit={"cover"}
                        />
                    </AspectRatio>

                    {/* Information */}
                    <Stack
                        width={"65%"}
                        justifyContent={"flex-start"}
                        gap={{ md: "2", lg: "3" }}
                    >
                        <Text
                            color={"gray.600"}
                            fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                            textTransform={"capitalize"}
                        >
                            {enrollment.course[0].category.category_name}
                        </Text>
                        <Heading
                            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                            noOfLines={{ base: "1", sm: "2" }}
                            textTransform={"capitalize"}
                        >
                            {enrollment.course[0].course_name}
                        </Heading>
                        {!enrollment.meta_data ? (
                            <>
                                <Progress
                                    value={0}
                                    rounded={"lg"}
                                    size={{ base: "xs", md: "sm", lg: "md" }}
                                />
                                <Text
                                    color={"gray.600"}
                                    fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                                >
                                    0% Completed
                                </Text>
                            </>
                        ) : (
                            <>
                                <Progress
                                    value={enrollment.meta_data.progress}
                                    rounded={"lg"}
                                    size={{ base: "xs", md: "sm", lg: "md" }}
                                />
                                <Text
                                    color={"gray.600"}
                                    fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                                >
                                    {enrollment.meta_data.progress}% Completed
                                </Text>
                            </>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Link>
    );
};

export default CourseCard;
