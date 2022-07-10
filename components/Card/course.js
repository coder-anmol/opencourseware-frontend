import {
    AspectRatio,
    Box,
    Heading,
    HStack,
    Stack,
    Text,
    Progress,
} from "@chakra-ui/react";
import Image from "next/image";
const CourseCard = () => {
    return (
        <Box
            border={"1px"}
            borderColor={"gray.200"}
            rounded={{ base: "lg", lg: "xl" }}
            p={{ base: 3, sm: "4", md: "6", lg: "8" }}
            shadow={{ base: "md", lg: "lg" }}
            cursor={"pointer"}
            _hover={{ bg: "gray.100" }}
            transition={"all 300ms ease-in-out"}
        >
            <Box
                display={"flex"}
                gap={{ base: "2", sm: "4", md: "6", lg: "8" }}
            >
                {/* Image */}
                <AspectRatio
                    pos={"relative"}
                    ratio={{ base: 1 / 1, lg: 4 / 3 }}
                    w={"35%"}
                    rounded={{ base: "lg", lg: "xl" }}
                    overflow={"hidden"}
                >
                    <Image
                        alt={"course image"}
                        src={"/course-default.jpg"}
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
                    >
                        Course
                    </Text>
                    <Heading
                        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                        noOfLines={{ base: "1", sm: "2" }}
                    >
                        Next. JS kdfjk dkslfjsldkf sldk kdjfks dfksd fkds flk f
                        sdklf{" "}
                    </Heading>
                    <Progress
                        value={60}
                        rounded={"lg"}
                        size={{ base: "xs", md: "sm", lg: "md" }}
                    />
                    <Text
                        color={"gray.600"}
                        fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                    >
                        60% Completed
                    </Text>
                </Stack>
            </Box>
        </Box>
    );
};

export default CourseCard;
