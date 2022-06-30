import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    List,
    ListItem,
} from "@chakra-ui/react";
import { HiMenuAlt3 as MenuOpen, HiX as MenuClose } from "react-icons/hi";
import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

function Navbar() {
    const [hamburgerState, setHamburgerState] = useState(true);
    const router = useRouter();

    return (
        <Box
            as="nav"
            pos="sticky"
            top={0}
            left={0}
            right={0}
            bg={"white"}
            shadow={"sm"}
        >
            <Container
                maxW={"container.xl"}
                display={{ lg: "flex" }}
                justifyContent={"space-between"}
            >
                <Flex
                    justify={"space-between"}
                    align={"center"}
                    py={4}
                    pos={"relative"}
                    zIndex={"20"}
                >
                    <Heading size={"lg"}>
                        <NextLink href={"/"}>OpenCourseWare</NextLink>
                    </Heading>

                    {/* Hamburger Icon */}
                    <Button
                        onClick={() => setHamburgerState(!hamburgerState)}
                        display={{ lg: "none" }}
                        size={"sm"}
                        variant={"unstyled"}
                    >
                        {hamburgerState ? (
                            <MenuOpen size={32} />
                        ) : (
                            <MenuClose size={32} />
                        )}
                    </Button>
                </Flex>

                {/* list */}
                <Box
                    visibility={{
                        base: hamburgerState ? "hidden" : "visible",
                        lg: "visible",
                    }}
                    height={{
                        base: hamburgerState ? "0" : "max-content",
                        lg: "max-content",
                    }}
                >
                    <Box>
                        <List
                            display={{ base: "flex" }}
                            flexDir={{ base: "column", lg: "row" }}
                            alignItems={"center"}
                            py={{ base: 10, lg: 4 }}
                            fontSize={"xl"}
                            gap={"10"}
                        >
                            <ListItem
                                fontWeight={"semibold"}
                                position={"relative"}
                                _after={{
                                    content: '""',
                                    height: "2px",
                                    bg: "black",
                                    position: "absolute",
                                    left: "0",
                                    right: "0",
                                    bottom: "-2px",
                                    transition: "all 0.3s ease-in-out 0s",
                                    ...(router.pathname == "/"
                                        ? {
                                              visibility: { lg: "visible" },
                                              transform: "scaleX(1)",
                                          }
                                        : {
                                              visibility: { lg: "hidden" },
                                              transform: "scaleX(0)",
                                          }),
                                }}
                                _hover={{
                                    _after: {
                                        visibility: "visible",
                                        transform: "scaleX(1)",
                                    },
                                }}
                            >
                                <NextLink href={"/"}>Home</NextLink>
                            </ListItem>
                            <ListItem fontWeight={"semibold"}>
                                <NextLink href={"/about"}>About</NextLink>
                            </ListItem>
                            <ListItem fontWeight={"semibold"}>
                                <NextLink href={"/contact"}>Contact</NextLink>
                            </ListItem>

                            <ListItem>
                                <NextLink href={"/login"}>
                                    <Button
                                        colorScheme={"blue"}
                                        variant={"solid"}
                                        size={"lg"}
                                    >
                                        Login / Register
                                    </Button>
                                </NextLink>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Navbar;
