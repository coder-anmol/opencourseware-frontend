import {
    Box,
    Heading,
    HStack,
    Accordion,
    Text,
    AccordionButton,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    Icon,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    AspectRatio,
    useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { BiVideo } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import ReactPlayer from "react-player/file";
import { useState, useEffect } from "react";

const WatchCourseLayout = ({ children }) => {
    const [isSSR, setIsSSR] = useState(true);
    const [url] = useState(
        "https://res.cloudinary.com/opencourseware/video/upload/v1657891280/uploads/v04eg4uszfvkauwejzox.mp4"
    );
    const isMobile = useBreakpointValue({ base: true, lg: false });

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <Box display={"flex"} height={"100vh"}>
            {/* left */}
            <Box
                mr={{ lg: "500px" }}
                w={"100%"}
                h={"100vh"}
                overflowY={"auto"}
                bg={"white"}
            >
                {/* top menu */}
                <HStack
                    h={"60px"}
                    px={"4"}
                    borderBottom={"1px"}
                    borderColor={"gray.200"}
                    position={"sticky"}
                    top={0}
                    bg={"white"}
                    gap={"3"}
                    zIndex={"1000"}
                >
                    <Link href={"/"}>
                        <Icon
                            as={HiOutlineArrowLeft}
                            fontSize={{ base: "xl", lg: "2xl" }}
                            cursor={"pointer"}
                            mt={{ base: "-4px" }}
                        />
                    </Link>
                    <Heading fontSize={{ base: "xl", lg: "2xl" }} noOfLines={1}>
                        Next.JS Course Full Stack
                    </Heading>
                </HStack>

                {/* Bottom */}
                <Box>
                    {/* Video Component */}
                    <AspectRatio ratio={16 / 9} bg={"gray.200"}>
                        <div>
                            {!isSSR && (
                                <ReactPlayer
                                    url={url}
                                    width={"100%"}
                                    height={"100%"}
                                    controls={true}
                                />
                            )}
                        </div>
                    </AspectRatio>

                    {/* Navs */}
                    <Box>
                        {isMobile && <TabComponent index={0} />}
                        {!isMobile && <TabComponent index={1} />}
                    </Box>
                </Box>
            </Box>

            {/* right */}
            <Box
                minH={"100vh"}
                borderLeft={"1px"}
                borderColor={"gray.200"}
                bg={"white"}
                position={"fixed"}
                right={"0"}
                top={"0"}
                bottom={"0"}
                overflowY={"scroll"}
                w={"100%"}
                maxW={"500px"}
                display={{ base: "none", lg: "block" }}
            >
                {/* top title */}
                <HStack
                    h={"60px"}
                    px={"4"}
                    borderBottom={"1px"}
                    borderColor={"gray.200"}
                    position={"sticky"}
                    top={0}
                    bg={"white"}
                >
                    <Heading fontSize={{ lg: "3xl" }}>Syllabus</Heading>
                </HStack>

                {/* course content accordian */}
                <Box>
                    <AccordionComponent />
                </Box>
            </Box>
        </Box>
    );
};

function TabComponent({ index }) {
    return (
        <Tabs size={"lg"} variant={"line"} defaultIndex={index}>
            <TabList borderBottom={"1px"} borderColor={"gray.200"} h={"60px"}>
                <Tab
                    fontSize={{ base: "lg", lg: "xl" }}
                    fontWeight={"bold"}
                    _selected={{
                        color: "primary",
                        borderColor: "primary",
                    }}
                    display={{ lg: "none" }}
                >
                    Syllabus
                </Tab>

                <Tab
                    fontSize={{ base: "lg", lg: "xl" }}
                    fontWeight={"bold"}
                    _selected={{
                        color: "primary",
                        borderColor: "primary",
                    }}
                >
                    About
                </Tab>
                <Tab
                    fontSize={{ base: "lg", lg: "xl" }}
                    fontWeight={"bold"}
                    _selected={{
                        color: "primary",
                        borderColor: "primary",
                    }}
                >
                    Review
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel display={{ lg: "none" }} p={0}>
                    <AccordionComponent />
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

function AccordionComponent() {
    return (
        <Accordion allowToggle>
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
                            <Text fontSize={"xl"}>01</Text>
                            <Box>
                                <Text fontSize={"xl"}>
                                    Section kfdkj dkjfdk{" "}
                                </Text>
                                <Text fontSize={"md"} color={"gray.600"}>
                                    13 Lessons
                                </Text>
                            </Box>
                        </HStack>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel p={0}>
                    <Box>
                        {[...new Array(9).keys()].map((i) => {
                            if (i != 0)
                                return (
                                    <HStack
                                        key={i}
                                        flex="1"
                                        textAlign="left"
                                        gap={"2"}
                                        alignItems={"flex-start"}
                                        cursor={"pointer"}
                                        py={3}
                                        px={4}
                                        _hover={{
                                            bg: "blackAlpha.50",
                                        }}
                                        borderTop={"1px"}
                                        borderColor={"gray.200"}
                                        transitionProperty={
                                            "var(--chakra-transition-property-common)"
                                        }
                                        transitionDuration={
                                            "var(--chakra-transition-duration-normal)"
                                        }
                                    >
                                        <Text fontSize={"xl"}>
                                            <Icon as={BiVideo} />
                                        </Text>
                                        <Box>
                                            <Text fontSize={"xl"}>
                                                0{i} Section kfdkj
                                            </Text>
                                            <Text
                                                fontSize={"md"}
                                                color={"gray.600"}
                                            >
                                                Video
                                            </Text>
                                        </Box>
                                    </HStack>
                                );
                        })}
                    </Box>
                </AccordionPanel>
            </AccordionItem>
            {[...new Array(15).keys()].map((i) => {
                return (
                    <AccordionItem key={i}>
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
                                    <Text fontSize={"xl"}>02</Text>
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
                                {[...new Array(9).keys()].map((i) => {
                                    if (i != 0)
                                        return (
                                            <HStack
                                                key={i}
                                                flex="1"
                                                textAlign="left"
                                                gap={"2"}
                                                alignItems={"flex-start"}
                                                cursor={"pointer"}
                                                py={3}
                                                px={4}
                                                _hover={{
                                                    bg: "blackAlpha.50",
                                                }}
                                                borderTop={"1px"}
                                                borderColor={"gray.200"}
                                                transitionProperty={
                                                    "var(--chakra-transition-property-common)"
                                                }
                                                transitionDuration={
                                                    "var(--chakra-transition-duration-normal)"
                                                }
                                            >
                                                <Text fontSize={"xl"}>
                                                    <Icon as={BiVideo} />
                                                </Text>
                                                <Box>
                                                    <Text fontSize={"xl"}>
                                                        0{i} Section kfdkj
                                                    </Text>
                                                    <Text
                                                        fontSize={"md"}
                                                        color={"gray.600"}
                                                    >
                                                        Video
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        );
                                })}
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                );
            })}

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
                            <Text fontSize={"xl"}>04</Text>
                            <Box>
                                <Text fontSize={"xl"}>
                                    Section kfdkj dkjfdk{" "}
                                </Text>
                                <Text fontSize={"md"} color={"gray.600"}>
                                    3 Lessons
                                </Text>
                            </Box>
                        </HStack>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel p={0}>
                    <Box>
                        {[...new Array(9).keys()].map((i) => {
                            if (i != 0)
                                return (
                                    <HStack
                                        key={i}
                                        flex="1"
                                        textAlign="left"
                                        gap={"2"}
                                        alignItems={"flex-start"}
                                        cursor={"pointer"}
                                        py={3}
                                        px={4}
                                        _hover={{
                                            bg: "blackAlpha.50",
                                        }}
                                        borderTop={"1px"}
                                        borderColor={"gray.200"}
                                        transitionProperty={
                                            "var(--chakra-transition-property-common)"
                                        }
                                        transitionDuration={
                                            "var(--chakra-transition-duration-normal)"
                                        }
                                    >
                                        <Text fontSize={"xl"}>
                                            <Icon as={BiVideo} />
                                        </Text>
                                        <Box>
                                            <Text fontSize={"xl"}>
                                                0{i} Section kfdkj
                                            </Text>
                                            <Text
                                                fontSize={"md"}
                                                color={"gray.600"}
                                            >
                                                Video
                                            </Text>
                                        </Box>
                                    </HStack>
                                );
                        })}
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
export default WatchCourseLayout;
