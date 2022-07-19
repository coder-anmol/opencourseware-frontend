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
                                Section 1 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                                Section 1 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                                Section 1 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                                Section 1 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                                Section 2 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default Faq;
