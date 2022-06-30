import {
    Container,
    chakra,
    Box,
    Text,
    Flex,
    IconButton,
} from "@chakra-ui/react";

import { BsArrowUp as Arrow } from "react-icons/bs";

function Footer() {
    return (
        <Box
            borderTop={1}
            borderBottom={1}
            borderTopStyle={"solid"}
            borderColor={"gray.300"}
        >
            <Container maxW={"container.xl"}>
                <chakra.footer
                    mx={[1]}
                    pb={{ base: 8, md: 5 }}
                    pt={{ base: 6, md: 5 }}
                >
                    <Flex
                        direction={{ base: "column-reverse", md: "row" }}
                        justify={{ base: "center", md: "space-between" }}
                        align={"center"}
                        pb={{ base: 3, md: 0 }}
                        gap={{ base: 5, md: 0 }}
                    >
                        <Box>
                            <Text fontSize={"lg"} color="gray.600">
                                &copy; {new Date().getFullYear()} OpenCourseWare
                            </Text>
                        </Box>
                        <Flex gap={1}>
                            <IconButton
                                onClick={() => {
                                    window.scroll({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                icon={<Arrow />}
                                color="gray.600"
                                _focus={{
                                    boxShadow: "none",
                                }}
                                size={"lg"}
                                bg={"transparent"}
                            />
                        </Flex>
                    </Flex>
                </chakra.footer>
            </Container>
        </Box>
    );
}

export default Footer;
