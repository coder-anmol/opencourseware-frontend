import Button from "@/components/Button";
import {
    Container,
    Box,
    Heading,
    Text,
    AspectRatio,
    Stack,
    Icon,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    HStack,
    Avatar,
} from "@chakra-ui/react";
import Image from "next/image";
import { BiVideo } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const CoursePreview = () => {
    return (
        <Container maxW={"container.xxl"}>
            <Box
                display={{ lg: "flex" }}
                gap={{ lg: "4" }}
                mt={{ base: "24", lg: "32" }}
                mb={{ base: "20", lg: "28" }}
                p={"4"}
                rounded={"3xl"}
                bg={"white"}
                shadow={"2xl"}
            >
                {/* left */}
                <Box
                    p={"4"}
                    rounded={"3xl"}
                    bg={"white"}
                    border={"1px"}
                    borderColor={"gray.200"}
                    shadow={"lg"}
                >
                    {/* course information */}
                    <Box>
                        <Heading
                            size={{ base: "lg", sm: "xl" }}
                            noOfLines={"2"}
                        >
                            Next.JS full course
                        </Heading>
                        <Text
                            mt={"2"}
                            mb={"6"}
                            noOfLines={"4"}
                            fontSize={{ sm: "lg", md: "xl" }}
                        >
                            Lets build full stack application with Next.js and
                            mongo db
                        </Text>
                    </Box>

                    {/* course card */}
                    <Box display={{ lg: "none" }}>
                        <CourseCard />
                    </Box>

                    {/* Syllabus  */}
                    <Box>
                        {/* syllabus accordian */}
                        <Box mt={"6"}>
                            <Heading size={{ base: "lg", sm: "xl" }}>
                                Syllabus
                            </Heading>

                            <Box mt={"3"}>
                                <Accordion
                                    border={"1px"}
                                    rounded={"xl"}
                                    borderColor={"gray.200"}
                                    overflow={"hidden"}
                                    allowToggle
                                >
                                    <AccordionItem borderTop={"0"}>
                                        <h2>
                                            <AccordionButton
                                                _expanded={{
                                                    bg: "blackAlpha.50",
                                                }}
                                                py={3}
                                            >
                                                <HStack
                                                    flex="1"
                                                    textAlign="left"
                                                    gap={"2"}
                                                    alignItems={"flex-start"}
                                                >
                                                    <Text fontSize={"xl"}>
                                                        01
                                                    </Text>
                                                    <Box>
                                                        <Text fontSize={"xl"}>
                                                            Section kfdkj dkjfdk{" "}
                                                        </Text>
                                                        <Text
                                                            fontSize={"md"}
                                                            color={"gray.600"}
                                                        >
                                                            13 Lessons
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel p={0}>
                                            <Box>
                                                {[...new Array(9).keys()].map(
                                                    (i) => {
                                                        if (i != 0)
                                                            return (
                                                                <HStack
                                                                    key={i}
                                                                    flex="1"
                                                                    textAlign="left"
                                                                    gap={"2"}
                                                                    alignItems={
                                                                        "flex-start"
                                                                    }
                                                                    cursor={
                                                                        "pointer"
                                                                    }
                                                                    py={3}
                                                                    px={4}
                                                                    _hover={{
                                                                        bg: "blackAlpha.50",
                                                                    }}
                                                                    borderTop={
                                                                        "1px"
                                                                    }
                                                                    borderColor={
                                                                        "gray.200"
                                                                    }
                                                                    transitionProperty={
                                                                        "var(--chakra-transition-property-common)"
                                                                    }
                                                                    transitionDuration={
                                                                        "var(--chakra-transition-duration-normal)"
                                                                    }
                                                                >
                                                                    <Text
                                                                        fontSize={
                                                                            "xl"
                                                                        }
                                                                    >
                                                                        <Icon
                                                                            as={
                                                                                BiVideo
                                                                            }
                                                                        />
                                                                    </Text>
                                                                    <Box>
                                                                        <Text
                                                                            fontSize={
                                                                                "xl"
                                                                            }
                                                                        >
                                                                            0{i}{" "}
                                                                            Section
                                                                            kfdkj
                                                                        </Text>
                                                                        <Text
                                                                            fontSize={
                                                                                "md"
                                                                            }
                                                                            color={
                                                                                "gray.600"
                                                                            }
                                                                        >
                                                                            Video
                                                                        </Text>
                                                                    </Box>
                                                                </HStack>
                                                            );
                                                    }
                                                )}
                                            </Box>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton
                                                _expanded={{
                                                    bg: "blackAlpha.50",
                                                }}
                                                py={3}
                                            >
                                                <HStack
                                                    flex="1"
                                                    textAlign="left"
                                                    gap={"2"}
                                                    alignItems={"flex-start"}
                                                >
                                                    <Text fontSize={"xl"}>
                                                        02
                                                    </Text>
                                                    <Box>
                                                        <Text fontSize={"xl"}>
                                                            Section kfdkj dkjfdk{" "}
                                                        </Text>
                                                        <Text
                                                            fontSize={"md"}
                                                            color={"gray.600"}
                                                        >
                                                            7 Lessons
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel p={0}>
                                            <Box>
                                                {[...new Array(9).keys()].map(
                                                    (i) => {
                                                        if (i != 0)
                                                            return (
                                                                <HStack
                                                                    key={i}
                                                                    flex="1"
                                                                    textAlign="left"
                                                                    gap={"2"}
                                                                    alignItems={
                                                                        "flex-start"
                                                                    }
                                                                    cursor={
                                                                        "pointer"
                                                                    }
                                                                    py={3}
                                                                    px={4}
                                                                    _hover={{
                                                                        bg: "blackAlpha.50",
                                                                    }}
                                                                    borderTop={
                                                                        "1px"
                                                                    }
                                                                    borderColor={
                                                                        "gray.200"
                                                                    }
                                                                    transitionProperty={
                                                                        "var(--chakra-transition-property-common)"
                                                                    }
                                                                    transitionDuration={
                                                                        "var(--chakra-transition-duration-normal)"
                                                                    }
                                                                >
                                                                    <Text
                                                                        fontSize={
                                                                            "xl"
                                                                        }
                                                                    >
                                                                        <Icon
                                                                            as={
                                                                                BiVideo
                                                                            }
                                                                        />
                                                                    </Text>
                                                                    <Box>
                                                                        <Text
                                                                            fontSize={
                                                                                "xl"
                                                                            }
                                                                        >
                                                                            0{i}{" "}
                                                                            Section
                                                                            kfdkj
                                                                        </Text>
                                                                        <Text
                                                                            fontSize={
                                                                                "md"
                                                                            }
                                                                            color={
                                                                                "gray.600"
                                                                            }
                                                                        >
                                                                            Video
                                                                        </Text>
                                                                    </Box>
                                                                </HStack>
                                                            );
                                                    }
                                                )}
                                            </Box>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton
                                                _expanded={{
                                                    bg: "blackAlpha.50",
                                                }}
                                                py={3}
                                            >
                                                <HStack
                                                    flex="1"
                                                    textAlign="left"
                                                    gap={"2"}
                                                    alignItems={"flex-start"}
                                                >
                                                    <Text fontSize={"xl"}>
                                                        03
                                                    </Text>
                                                    <Box>
                                                        <Text fontSize={"xl"}>
                                                            Section kfdkj dkjfdk{" "}
                                                        </Text>
                                                        <Text
                                                            fontSize={"md"}
                                                            color={"gray.600"}
                                                        >
                                                            9 Lessons
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel p={0}>
                                            <Box>
                                                {[...new Array(9).keys()].map(
                                                    (i) => {
                                                        if (i != 0)
                                                            return (
                                                                <HStack
                                                                    key={i}
                                                                    flex="1"
                                                                    textAlign="left"
                                                                    gap={"2"}
                                                                    alignItems={
                                                                        "flex-start"
                                                                    }
                                                                    cursor={
                                                                        "pointer"
                                                                    }
                                                                    py={3}
                                                                    px={4}
                                                                    _hover={{
                                                                        bg: "blackAlpha.50",
                                                                    }}
                                                                    borderTop={
                                                                        "1px"
                                                                    }
                                                                    borderColor={
                                                                        "gray.200"
                                                                    }
                                                                    transitionProperty={
                                                                        "var(--chakra-transition-property-common)"
                                                                    }
                                                                    transitionDuration={
                                                                        "var(--chakra-transition-duration-normal)"
                                                                    }
                                                                >
                                                                    <Text
                                                                        fontSize={
                                                                            "xl"
                                                                        }
                                                                    >
                                                                        <Icon
                                                                            as={
                                                                                BiVideo
                                                                            }
                                                                        />
                                                                    </Text>
                                                                    <Box>
                                                                        <Text
                                                                            fontSize={
                                                                                "xl"
                                                                            }
                                                                        >
                                                                            0{i}{" "}
                                                                            Section
                                                                            kfdkj
                                                                        </Text>
                                                                        <Text
                                                                            fontSize={
                                                                                "md"
                                                                            }
                                                                            color={
                                                                                "gray.600"
                                                                            }
                                                                        >
                                                                            Video
                                                                        </Text>
                                                                    </Box>
                                                                </HStack>
                                                            );
                                                    }
                                                )}
                                            </Box>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem borderBottom={"0"}>
                                        <h2>
                                            <AccordionButton
                                                _expanded={{
                                                    bg: "blackAlpha.50",
                                                }}
                                                py={3}
                                            >
                                                <HStack
                                                    flex="1"
                                                    textAlign="left"
                                                    gap={"2"}
                                                    alignItems={"flex-start"}
                                                >
                                                    <Text fontSize={"xl"}>
                                                        04
                                                    </Text>
                                                    <Box>
                                                        <Text fontSize={"xl"}>
                                                            Section kfdkj dkjfdk{" "}
                                                        </Text>
                                                        <Text
                                                            fontSize={"md"}
                                                            color={"gray.600"}
                                                        >
                                                            3 Lessons
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel p={0}>
                                            <Box>
                                                {[...new Array(9).keys()].map(
                                                    (i) => {
                                                        if (i != 0)
                                                            return (
                                                                <HStack
                                                                    key={i}
                                                                    flex="1"
                                                                    textAlign="left"
                                                                    gap={"2"}
                                                                    alignItems={
                                                                        "flex-start"
                                                                    }
                                                                    cursor={
                                                                        "pointer"
                                                                    }
                                                                    py={3}
                                                                    px={4}
                                                                    _hover={{
                                                                        bg: "blackAlpha.50",
                                                                    }}
                                                                    borderTop={
                                                                        "1px"
                                                                    }
                                                                    borderColor={
                                                                        "gray.200"
                                                                    }
                                                                    transitionProperty={
                                                                        "var(--chakra-transition-property-common)"
                                                                    }
                                                                    transitionDuration={
                                                                        "var(--chakra-transition-duration-normal)"
                                                                    }
                                                                >
                                                                    <Text
                                                                        fontSize={
                                                                            "xl"
                                                                        }
                                                                    >
                                                                        <Icon
                                                                            as={
                                                                                BiVideo
                                                                            }
                                                                        />
                                                                    </Text>
                                                                    <Box>
                                                                        <Text
                                                                            fontSize={
                                                                                "xl"
                                                                            }
                                                                        >
                                                                            0{i}{" "}
                                                                            Section
                                                                            kfdkj
                                                                        </Text>
                                                                        <Text
                                                                            fontSize={
                                                                                "md"
                                                                            }
                                                                            color={
                                                                                "gray.600"
                                                                            }
                                                                        >
                                                                            Video
                                                                        </Text>
                                                                    </Box>
                                                                </HStack>
                                                            );
                                                    }
                                                )}
                                            </Box>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Box>
                        </Box>
                    </Box>

                    {/* Author section */}
                    <Box mt={6}>
                        {/* author card: use previous */}
                        <Heading
                            size={{ base: "lg", sm: "xl" }}
                            mb={3}
                            mt={{ base: "3", lg: "14" }}
                        >
                            Author
                        </Heading>
                        <Stack>
                            <Link href={"/profile"}>
                                <HStack>
                                    <Avatar
                                        name="Anmol Sharma"
                                        src={"/default-teacher.jpg"}
                                        bg={"primary"}
                                        size={{ base: "md", sm: "lg" }}
                                    />

                                    <Text
                                        color={"gray.800"}
                                        fontSize={{ sm: "xl", md: "2xl" }}
                                        noOfLines={{ base: 1 }}
                                        fontWeight={"bold"}
                                    >
                                        John Doe
                                    </Text>
                                </HStack>
                            </Link>
                            <Box>
                                <Text
                                    fontSize={{ sm: "lg", md: "xl" }}
                                    noOfLines={"10"}
                                >
                                    Lorem ipsum ksjfk sjdkf skdjfskd fksd fklsd
                                    fslkd fksd kfjsdkfjklsdj fksjd fkjsdj
                                    flsdkjfk dsjkflj sdkljf dskjfk sdjfkljsda
                                    lk;fjks djflk; sajdfksd ljfksdfds
                                </Text>
                            </Box>
                        </Stack>

                        {/* about course card */}
                    </Box>

                    {/* About Section */}
                    <Box my={6}>
                        {/* author card: use previous */}
                        <Heading
                            size={{ base: "lg", sm: "xl" }}
                            mb={3}
                            mt={{ base: "3", lg: "14" }}
                        >
                            About This Course
                        </Heading>
                        <Stack>
                            <Box>
                                <Text
                                    fontSize={{ sm: "lg", md: "xl" }}
                                    noOfLines={"10"}
                                >
                                    Lorem ipsum ksjfk sjdkf skdjfskd fksd fklsd
                                    fslkd fksd kfjsdkfjklsdj fksjd fkjsdj
                                    flsdkjfk dsjkflj sdkljf dskjfk sdjfkljsda
                                    lk;fjks djflk; sajdfksd ljfksdfds
                                </Text>
                            </Box>
                        </Stack>

                        {/* about course card */}
                    </Box>
                </Box>

                {/* right */}
                <Box
                    display={{ base: "none", lg: "block" }}
                    minW={{ lg: "320px", xl: "400px" }}
                >
                    <CourseCard />
                </Box>
            </Box>
        </Container>
    );
};

function CourseCard() {
    return (
        <Stack
            p={"4"}
            border={"1px"}
            rounded={"xl"}
            borderColor={"gray.200"}
            shadow={"lg"}
        >
            <Stack gap={"2"}>
                {/* image */}
                <AspectRatio
                    position={"relative"}
                    ratio={"16/9"}
                    w={"100%"}
                    h={{
                        base: "220px",
                        sm: "260px",
                        md: "360px",
                        lg: "250px",
                        xl: "280px",
                    }}
                    rounded={"xl"}
                    overflow={"hidden"}
                >
                    <Image
                        src={"/course-default.jpg"}
                        layout={"fill"}
                        objectFit={"cover"}
                        alt={"course image"}
                    />
                </AspectRatio>

                {/* button */}
                <Button w={"100%"}>Enroll Now</Button>

                {/* other info */}
                <Box pt={"2"}>
                    <Text fontWeight={"bold"}>{"What's included"}</Text>
                    <Text display={"flex"} alignItems={"center"} gap={"2"}>
                        <Icon as={FaPlus} /> 13 Lessons
                    </Text>
                </Box>
            </Stack>
        </Stack>
    );
}

export default CoursePreview;
