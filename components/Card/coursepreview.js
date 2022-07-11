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

const CoursePreviewCard = () => {
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
                        noOfLines={{ base: "2" }}
                    >
                        Next. JS kdfjk dkslfjsldkf sldk kdjfks dfksd fkds flk f
                        Next. JS kdfjk dkslfjsldkf sldk kdjfks dfksd fkds flk f
                        Next. JS kdfjk dkslfjsldkf sldk kdjfks dfksd fkds flk f
                        Next. JS kdfjk dkslfjsldkf sldk kdjfks dfksd fkds flk f
                        sdklf{" "}
                    </Heading>
                    <Text
                        color={"gray.600"}
                        fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                        noOfLines={{ base: 1, sm: 2, md: 3, lg: 2 }}
                    >
                        Lorem ipsum dolor sjdkfj kdsjf kds ks fjkdsjf jsdkljfsdk
                        jf skdfj ksdjfksdj kfsdlkfj sdjflsd jfksdjaf kdsljf ksjd
                        lfkjsdj afl sjdkfjs dkfjskdjfks jdfjsd lfskdjf ksdlfj
                        ksdjfkjsdlkfjsjd fjlsdkj fkl jdsflsdaj fj dslafsdklflk
                        jsdafkj sakj fskjd kfjsad kjfjasdljfjds kafjdsa kdjaflkd
                        fjakdsj fjsal kjdf
                    </Text>

                    <HStack display={{ base: "none", lg: "flex" }}>
                        <Link href={"/profile"}>
                            <HStack>
                                <Avatar
                                    name="Anmol Sharma"
                                    src=""
                                    bg={"primary"}
                                />

                                <Text
                                    color={"gray.800"}
                                    fontSize={{ sm: "lg", md: "xl", lg: "2xl" }}
                                    noOfLines={{ base: 1 }}
                                >
                                    Lorem ipsum
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
