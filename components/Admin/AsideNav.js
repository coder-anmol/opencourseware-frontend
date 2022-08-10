import {
    Box,
    Heading,
    HStack,
    List,
    ListIcon,
    ListItem,
    Stack,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { MdCheckCircle, MdContacts } from "react-icons/md";
import { useRouter } from "next/router";
import { useRef } from "react";
import {
    HiHome,
    HiLibrary,
    HiUsers,
    HiCube,
    HiAnnotation,
    HiColorSwatch,
} from "react-icons/hi";

const routesList = [
    {
        name: "Categories",
        link: "/admin/categories",
        icon: HiCube,
    },
    {
        name: "Contacts",
        link: "/admin/contacts",
        icon: MdContacts,
    },
    {
        name: "Courses",
        link: "/admin/courses",
        icon: HiLibrary,
    },
    {
        name: "Enrollments",
        link: "/admin/enrollments",
        icon: HiColorSwatch,
    },
    {
        name: "Reviews",
        link: "/admin/reviews",
        icon: HiAnnotation,
    },
    {
        name: "Users",
        link: "/admin/users",
        icon: HiUsers,
    },
];

const AsideNavbar = ({ isOpen, onOpen, onClose }) => {
    const router = useRouter();
    const btnRef = useRef();

    return (
        <>
            {/* Desktop Aside Nav */}
            <Stack
                w={"100%"}
                h={"100vh"}
                maxH={"100vh"}
                bg={"white"}
                overflowY={"auto"}
                display={{ base: "none", lg: "flex" }}
                shadow={"xl"}
            >
                {/* top logo */}
                <HStack
                    justify={"center"}
                    py={"3"}
                    borderBottom={"1px"}
                    borderColor={"gray.200"}
                    // shadow={"sm"}
                >
                    <HStack>
                        <Box w={"45px"} h={"45px"} pos={"relative"}>
                            <Image
                                alt="Open Course Ware logo"
                                src={"/logo.png"}
                                layout={"fill"}
                                objectFit="cover"
                            />
                        </Box>
                        <Heading fontSize={{ lg: "3xl" }}>Admin.</Heading>
                    </HStack>
                </HStack>

                {/* links list */}
                <Stack
                    as={List}
                    gap={"3"}
                    __css={{
                        "& li": {
                            display: "flex",
                            alignItems: "center",
                            mx: "4",
                            pl: "4",
                            py: "2",
                            rounded: "xl",
                            "&:hover": {
                                bg: "primary",
                                color: "white",
                                shadow: "lg",
                            },
                        },
                    }}
                    fontSize={"xl"}
                    pt={"4"}
                    transition={"all 300ms ease-in-out 60ms"}
                    cursor={"pointer"}
                >
                    <Link href={"/admin"}>
                        <ListItem
                            {...(router.pathname == "/admin" && {
                                bg: "primary",
                                color: "white",
                                shadow: "lg",
                            })}
                        >
                            <ListIcon as={HiHome} />
                            Home
                        </ListItem>
                    </Link>
                    {routesList.map((item, i) => {
                        const result = router.pathname.includes(item.link);

                        return (
                            <Link key={i} href={item.link}>
                                <ListItem
                                    {...(result && {
                                        bg: "primary",
                                        color: "white",
                                        shadow: "lg",
                                    })}
                                >
                                    <ListIcon as={item.icon} />
                                    {item.name}
                                </ListItem>
                            </Link>
                        );
                    })}
                </Stack>
            </Stack>

            {/* mobile aside nav */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton size={"lg"} />

                    <DrawerBody>
                        {/* top logo */}
                        <HStack justify={"center"} py={"3"}>
                            <HStack>
                                <Box w={"45px"} h={"45px"} pos={"relative"}>
                                    <Image
                                        alt="Open Course Ware logo"
                                        src={"/logo.png"}
                                        layout={"fill"}
                                        objectFit="cover"
                                    />
                                </Box>
                                <Heading
                                    fontSize={{
                                        base: "2xl",
                                        lg: "3xl",
                                    }}
                                >
                                    Admin.
                                </Heading>
                            </HStack>
                        </HStack>

                        {/* links list */}
                        <Stack
                            as={List}
                            gap={"3"}
                            __css={{
                                "& li": {
                                    display: "flex",
                                    alignItems: "center",
                                    mx: "4",
                                    pl: "4",
                                    py: "2",
                                    rounded: "xl",
                                    "&:hover": {
                                        bg: "primary",
                                        color: "white",
                                        shadow: "lg",
                                    },
                                },
                            }}
                            fontSize={"xl"}
                            pt={"4"}
                            transition={"all 300ms ease-in-out 60ms"}
                            cursor={"pointer"}
                        >
                            <Link href={"/admin"}>
                                <ListItem
                                    {...(router.pathname == "/admin" && {
                                        bg: "primary",
                                        color: "white",
                                        shadow: "lg",
                                    })}
                                    onClick={onClose}
                                >
                                    <ListIcon as={MdCheckCircle} />
                                    Home
                                </ListItem>
                            </Link>
                            {routesList.map((item, i) => {
                                const result = router.pathname.includes(
                                    item.link
                                );

                                return (
                                    <Link key={i} href={item.link}>
                                        <ListItem
                                            {...(result && {
                                                bg: "primary",
                                                color: "white",
                                                shadow: "lg",
                                            })}
                                            onClick={onClose}
                                        >
                                            <ListIcon as={MdCheckCircle} />
                                            {item.name}
                                        </ListItem>
                                    </Link>
                                );
                            })}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default AsideNavbar;
