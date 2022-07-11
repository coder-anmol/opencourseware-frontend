import {
    Container,
    Heading,
    Box,
    Stack,
    AspectRatio,
    Text,
    HStack,
} from "@chakra-ui/react";
import { ST } from "next/dist/shared/lib/utils";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";

const TeacherProfile = () => {
    return (
        <Container maxW={"container.xxl"}>
            <Box
                my={{ base: "6", lg: "10" }}
                pt={"1"}
                pb={"1"}
                p={"6"}
                rounded={"3xl"}
                bg={"white"}
                shadow={"2xl"}
            >
                <Stack>
                    <Box>
                        <Heading mb={2}>Teacher</Heading>
                    </Box>

                    <Box display={{ md: "flex" }} gap={{ md: "4" }}>
                        {/* Image */}
                        <AspectRatio
                            position={"relative"}
                            ratio={{ base: 4 / 3 }}
                            w={{ base: "full", md: "1500px" }}
                            rounded={"xl"}
                            overflow={"hidden"}
                            shadow={"lg"}
                            flexGrow={{ md: "3" }}
                        >
                            <Image
                                alt={"teacher profile"}
                                layout={"fill"}
                                objectFit={"cover"}
                                src={"/default-teacher.jpg"}
                            />
                        </AspectRatio>

                        {/* Details */}
                        <Stack gap={{ base: "2" }} flexGrow={{ md: "3" }}>
                            {/* name, subject */}
                            <Box>
                                <Heading mt={{ base: "5", md: 0 }} size={"lg"}>
                                    Hardeep Kumar
                                </Heading>
                                <Text fontSize={{ base: "lg" }}>
                                    Teaches Django And API Development
                                </Text>
                            </Box>

                            {/* rating or badge */}
                            <Box>
                                <Text
                                    fontSize={{ base: "lg" }}
                                    fontWeight={"bold"}
                                >
                                    Rating:
                                </Text>
                                <HStack>
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                        value={4.5}
                                        edit={false}
                                    />
                                    <Text
                                        fontSize={{ base: "lg" }}
                                        fontWeight={"bold"}
                                    >
                                        {4.5}
                                    </Text>
                                </HStack>
                            </Box>

                            {/* Bio */}
                            <Box>
                                <Text
                                    fontSize={{ base: "lg" }}
                                    fontWeight={"bold"}
                                >
                                    Bio:
                                </Text>
                                <Text fontSize={{ base: "lg" }}>
                                    Lorem Ipsum sdkfjds ksdjf sdjlk fsjdkl
                                    fskdlf sdjkf dsklfksd fkl sd;lfkds
                                    jfklsdjkfjdslf sdkfsldjfl sdkfsldjflsdkfj
                                    jfklsdjkfjdslf sdkfsldjfl sdkfsldjflsdkfj
                                    dsklfksdfsd afj dslkjf kljsd fjsldk jflksjd
                                    fjdlskj flkjdsflkjdsk fjslkdajsd
                                    kfjsldjflkjds fkjlsda jflkdjs ;lfjsdla
                                    dsklfksdfsd afj dslkjf kljsd fjsldk jflksjd
                                    fjdlskj flkjdsflkjdsk fjslkdajsd
                                    kfjsldjflkjds fkjlsda jflkdjs ;lfjsdla
                                    jfl;djas kfjldskj fldsjalfkasd flsjdalfk
                                </Text>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Container>
    );
};

export default TeacherProfile;
