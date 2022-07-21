import {
    Box,
    Container,
    Heading,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Avatar,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button/index.js";
import Link from "next/link";
import { useRouter } from "next/router";
import useStore from "store";
import swal from "@sweetalert/with-react";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const [isSSR, setIsSSR] = useState(true);
    const router = useRouter();
    const user = useStore((state) => state.user);
    const userData = useStore((state) => state.userData);
    const logout = useStore((state) => state.logoutUser);

    useEffect(() => {
        setIsSSR(false);
    }, []);

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
                            <Link href={"/"}>
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
                            </Link>

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
                                gap={{ base: "2rem", lg: "12" }}
                                fontWeight={"bold"}
                                __css={{
                                    "& li": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <Link href={"/"}>
                                    <ListItem>Home</ListItem>
                                </Link>
                                <Link href={"/courses"}>
                                    <ListItem>Courses</ListItem>
                                </Link>
                                <Link href={"/contact"}>
                                    <ListItem>Contact</ListItem>
                                </Link>
                                {!isSSR && !user && (
                                    <Link href={"/login"}>
                                        <ListItem>
                                            <Button>Login</Button>
                                        </ListItem>
                                    </Link>
                                )}
                                {/* Profile */}
                                {!isSSR && user && (
                                    <ListItem>
                                        <Menu>
                                            <MenuButton>
                                                {userData && (
                                                    <Profile
                                                        url={
                                                            userData.profile_image
                                                        }
                                                        name={userData.name}
                                                    />
                                                )}
                                                {!userData && (
                                                    <Profile
                                                        url={
                                                            "/default-profile.png"
                                                        }
                                                    />
                                                )}
                                            </MenuButton>
                                            <MenuList
                                                mt={2}
                                                rounded={"xl"}
                                                shadow={"xl"}
                                            >
                                                {userData &&
                                                    !userData.is_admin && (
                                                        <Link
                                                            href={"/dashboard"}
                                                        >
                                                            <a>
                                                                <MenuItem>
                                                                    Dashboard
                                                                </MenuItem>
                                                            </a>
                                                        </Link>
                                                    )}

                                                <Link href={"/profile"}>
                                                    <a>
                                                        <MenuItem>
                                                            Profile
                                                        </MenuItem>
                                                    </a>
                                                </Link>

                                                {userData && userData.is_admin && (
                                                    <Link href={"/admin"}>
                                                        <a>
                                                            <MenuItem>
                                                                Admin
                                                            </MenuItem>
                                                        </a>
                                                    </Link>
                                                )}
                                                <MenuItem
                                                    onClick={() => {
                                                        logout();
                                                        swal({
                                                            title: "Logged Out",
                                                            icon: "success",
                                                            text: "You have been logged out",
                                                            type: "success",
                                                        });
                                                        setNavbar(false);
                                                    }}
                                                >
                                                    Logout
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

const Profile = ({ url, name }) => {
    return (
        <Box
            w={"45px"}
            h={"45px"}
            pos={"relative"}
            __css={{
                "& img": {
                    rounded: "full",
                },
            }}
        >
            <Avatar name={name} src={url} cursor={"pointer"} />
        </Box>
    );
};

export default Navbar;
