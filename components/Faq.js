import {
    Accordion,
    AccordionIcon,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
    Heading,
} from "@chakra-ui/react";

const Faq = () => {
    return (
        <Box
            my={"20"}
            bg={"white"}
            rounded={"xl"}
            shadow={"xl"}
            px={{ base: "3", lg: "8" }}
            py={{ base: "10", lg: "12" }}
        >
            <Heading textAlign={"center"}>{"FAQ's"}</Heading>
            <Accordion
                allowToggle
                border={"1px"}
                borderColor={"gray.200"}
                rounded={"xl"}
                overflow={"hidden"}
                my={"10"}
            >
                <AccordionItem borderTop={"0px"}>
                    <h2>
                        <AccordionButton>
                            <Box
                                flex="1"
                                textAlign="left"
                                fontSize={"xl"}
                                py={3}
                            >
                                What is OpenCourseWare ?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        OpenCourseWare is an e-learning web application
                        platform. It is free to use and totally community
                        driven. Any person who wants to teach any skill or a
                        subject can register and create courses. Any person who
                        wants to learn a subject or a new skill can register and
                        get enrolled in a course and start learning in a
                        distraction free environment. A person can track his
                        progress, give reviews to the course instructor.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem borderBottom={"0px"}>
                    <h2>
                        <AccordionButton>
                            <Box
                                flex="1"
                                textAlign="left"
                                fontSize={"xl"}
                                py={3}
                            >
                                Is OpenCourseWare Free ?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Yes, OpenCourseWare is free to use.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem borderBottom={"0px"}>
                    <h2>
                        <AccordionButton>
                            <Box
                                flex="1"
                                textAlign="left"
                                fontSize={"xl"}
                                py={3}
                            >
                                Do OpenCourseWare has course approval system ?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Yes, OpenCourseWare has course approval system. Admin
                        will approve the courses created by the teachers before
                        publishing them.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem borderBottom={"0px"}>
                    <h2>
                        <AccordionButton>
                            <Box
                                flex="1"
                                textAlign="left"
                                fontSize={"xl"}
                                py={3}
                            >
                                {"Does the student's progress is saved ?"}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Yes, the progress of a student is saved.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem borderBottom={"0px"}>
                    <h2>
                        <AccordionButton>
                            <Box
                                flex="1"
                                textAlign="left"
                                fontSize={"xl"}
                                py={3}
                            >
                                Does OpenCourseWare supports multiple devices
                                login?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Yes, user can login from multiple devices and his/her
                        progress will be in sync on all devices.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default Faq;
