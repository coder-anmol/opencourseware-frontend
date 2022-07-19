import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Box,
    Container,
    HStack,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    Stack,
    List,
    ListItem,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

const Profile = (props) => {
    const router = useRouter();

    return (
        <Container maxW={"container.xxl"}>
            <Box
                as="section"
                bg={"white"}
                mt={{ base: "24", lg: "32" }}
                mb={{ base: "6" }}
                px={{ base: "3", lg: "6" }}
                py={{ base: "6" }}
                rounded={"xl"}
                shadow={"xl"}
            >
                {/* breadcrumb */}
                <Box>
                    <Breadcrumb fontSize={"lg"}>
                        <BreadcrumbItem>
                            <Link href={"/"}>
                                <BreadcrumbLink
                                    color={"primary"}
                                    textDecor={"underline"}
                                >
                                    Home
                                </BreadcrumbLink>
                            </Link>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            {props.list.map((link, i) => {
                                if (router.pathname == link.href) {
                                    return (
                                        <Link href={link.href} key={i}>
                                            <BreadcrumbLink
                                                _hover={{
                                                    color: "primary",
                                                    textDecor: "underline",
                                                }}
                                            >
                                                {link.name}
                                            </BreadcrumbLink>
                                        </Link>
                                    );
                                }
                            })}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Box>

                {/* title and nav */}
                <HStack
                    justify={{ base: "space-between" }}
                    align={{ base: "center" }}
                    mt={{ base: "3" }}
                >
                    <Heading>Account</Heading>
                    <Menu>
                        <MenuButton display={{ lg: "none" }}>
                            <Icon
                                as={BiDotsVerticalRounded}
                                fontSize={"3xl"}
                                cursor={"pointer"}
                                mb={-2}
                            />
                        </MenuButton>
                        <MenuList mt={2} rounded={"xl"} shadow={"xl"}>
                            {props.list.map((link, i) => {
                                return (
                                    <Link href={link.href} key={i}>
                                        <MenuItem>{link.name}</MenuItem>
                                    </Link>
                                );
                            })}
                        </MenuList>
                    </Menu>
                </HStack>
            </Box>
            {/* page */}
            <Box as="section" mb={{ base: "24", lg: "32" }}>
                <Box gap={{ lg: "5" }} display={{ lg: "flex" }}>
                    {/* left */}
                    <Stack
                        display={{ base: "none", lg: "block" }}
                        bg={"white"}
                        p={5}
                        rounded={"xl"}
                        shadow={"xl"}
                        fontSize={"2xl"}
                        height={"max-content"}
                    >
                        <List
                            display={"flex"}
                            flexDirection={"column"}
                            gap={4}
                            w={"260px"}
                        >
                            {props.list.map((link, i) => {
                                return (
                                    <Link href={link.href} key={i}>
                                        <ListItem
                                            py={"3"}
                                            pl={"6"}
                                            rounded={"xl"}
                                            transition={"all 300ms ease-in-out"}
                                            cursor={"pointer"}
                                            _hover={{
                                                bg: "primary",
                                                color: "white",
                                            }}
                                            {...(router.pathname ==
                                                link.href && {
                                                bg: "primary",
                                                color: "white",
                                            })}
                                        >
                                            {link.name}
                                        </ListItem>
                                    </Link>
                                );
                            })}
                        </List>
                    </Stack>

                    {/* right */}
                    <Box
                        bg={"white"}
                        flexGrow={8}
                        px={{ base: "3", lg: "6" }}
                        py={{ base: "6" }}
                        rounded={"xl"}
                        shadow={"xl"}
                    >
                        <Box>{props.children}</Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;
