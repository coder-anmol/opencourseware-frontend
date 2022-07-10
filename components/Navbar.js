import { Box, Container, Heading, List, ListItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button/index.js";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setNavbar(false);
    }, [router.route]);

    return (
        <Box as={"nav"} pos={"fixed"} top={"2"} zIndex={"100"} width="100%">
            <Container maxW={"container.xxl"} px={{ base: "3", lg: "4" }}>
                <Box
                    minH={"0"}
                    background={"hsla(0,0%,100%,.8)"}
                    rounded={"50px"}
                    px={{ base: "8", lg: "10" }}
                    boxShadow={"0 .3125rem .625rem 0 rgba(0,0,0,.19)"}
                    backdropFilter={"blur(4px)"}
                >
                    <Box
                        display={{ lg: "flex" }}
                        justifyContent={{ lg: "space-between" }}
                    >
                        {/* navbar left */}
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            // px={"3"}
                            py={"3"}
                        >
                            {/* logo */}
                            <Box
                                display={{ lg: "flex" }}
                                alignItems={{ lg: "center" }}
                                gap={{ lg: "3" }}
                                cursor={"pointer"}
                            >
                                <Box w={"45px"} h={"45px"} pos={"relative"}>
                                    <Image
                                        alt="Open Course Ware logo"
                                        src={"/logo.png"}
                                        layout={"fill"}
                                        objectFit="cover"
                                    />
                                </Box>
                                <Heading
                                    display={{ base: "none", lg: "block" }}
                                    fontSize={"3xl"}
                                >
                                    OpenCourseWare
                                </Heading>
                            </Box>

                            {/* hamburger */}
                            <Box
                                width={"1.5em"}
                                height={"1.5em"}
                                cursor={"pointer"}
                                display={{ base: "flex", lg: "none" }}
                                justifyContent={"center"}
                                alignItems={"center"}
                                __css={{
                                    "& > span > span": {
                                        display: "block",
                                        position: "relative",
                                        width: "24px",
                                        height: "1px",
                                        borderRadius: "2px",
                                        bg: "black",
                                        transition: "all 0.35s",
                                        margin: "0 auto",
                                    },
                                }}
                                onClick={() => setNavbar(!navbar)}
                            >
                                <Box as={"span"}>
                                    <Box
                                        as={"span"}
                                        top={"0"}
                                        style={
                                            navbar
                                                ? {
                                                      transform:
                                                          "rotate(45deg) translate(7px, 7px)",
                                                  }
                                                : {}
                                        }
                                    ></Box>
                                    <Box
                                        as={"span"}
                                        margin={"9px auto !important"}
                                        style={
                                            navbar
                                                ? {
                                                      opacity: "0",
                                                  }
                                                : {}
                                        }
                                    ></Box>
                                    <Box
                                        as={"span"}
                                        bottom={"0"}
                                        style={
                                            navbar
                                                ? {
                                                      transform:
                                                          "rotate(-45deg) translate(7px, -7px)",
                                                  }
                                                : {}
                                        }
                                    ></Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* navbar right */}
                        <Box
                            fontSize={"1.3rem"}
                            overflow={{ base: "hidden", lg: "visible" }}
                            transition={"max-height 0.35s ease-in-out"}
                            maxHeight={{
                                base: !navbar ? "0" : "100vh",
                                lg: "max-content",
                            }}
                            display={{ lg: "flex" }}
                        >
                            <List
                                padding={{ base: "40px", lg: 0 }}
                                py={{ lg: "3" }}
                                display={"flex"}
                                flexDir={{ base: "column", lg: "row" }}
                                alignItems={"center"}
                                gap={{ base: "2rem", lg: "16" }}
                                fontWeight={"bold"}
                                __css={{
                                    "& li": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Link href={"/login"}>
                                    <ListItem>Home</ListItem>
                                </Link>
                                <Link href={"/login"}>
                                    <ListItem>Courses</ListItem>
                                </Link>
                                <Link href={"/contact"}>
                                    <ListItem>Contact</ListItem>
                                </Link>
                                <Link href={"/login"}>
                                    <ListItem>
                                        <Button>Login</Button>
                                    </ListItem>
                                </Link>
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Navbar;
