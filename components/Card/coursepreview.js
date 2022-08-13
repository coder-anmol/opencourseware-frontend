import {
    AspectRatio,
    Box,
    Heading,
    Stack,
    Text,
    Avatar,
    HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const CoursePreviewCard = ({
    title,
    description,
    category,
    teacherName,
    teacherProfile,
    teacherId,
    coverImage,
}) => {
    return (
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
                        src={coverImage}
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
                        {category}
                    </Text>
                    <Heading
                        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                        noOfLines={{ base: "2" }}
                        textTransform={"capitalize"}
                    >
                        {title}
                    </Heading>
                    <Text
                        color={"gray.600"}
                        fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                        noOfLines={{ base: 1, sm: 2, md: 3, lg: 2 }}
                        textTransform={"capitalize"}
                    >
                        {description}
                    </Text>

                    <HStack display={{ base: "none", lg: "flex" }}>
                        <Link href={`/instructor/${teacherId}`}>
                            <HStack>
                                <Avatar
                                    name={teacherName}
                                    src={teacherProfile}
                                    bg={"primary"}
                                />

                                <Text
                                    color={"gray.800"}
                                    fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                                    noOfLines={{ base: 1 }}
                                    textTransform={"capitalize"}
                                >
                                    {teacherName}
                                </Text>
                            </HStack>
                        </Link>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    );
};

export default CoursePreviewCard;
