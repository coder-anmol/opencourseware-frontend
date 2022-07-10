import {
    Heading,
    Text,
    List,
    ListItem,
    Stack,
    Box,
    IconButton,
    Container,
    HStack,
} from "@chakra-ui/react";
import { FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

function Footer() {
    return (
        <Box
            as={"footer"}
            borderTop={"1px solid"}
            borderColor={"gray.200"}
            pt={"10"}
        >
            <Container maxW={"container.xxl"}>
                <Stack>
                    <Box
                        display={{ md: "flex" }}
                        justifyContent={"space-between"}
                    >
                        {/* Top */}
                        <Box mb={"5"}>
                            <Heading
                                as={"h4"}
                                fontSize={"2xl"}
                                color={"primary"}
                                mb={"6"}
                                display={"flex"}
                                alignItems={"center"}
                                gap={"3"}
                            >
                                <Box w={"45px"} h={"45px"} pos={"relative"}>
                                    <Image
                                        alt="Open Course Ware logo"
                                        src={"/logo.png"}
                                        layout={"fill"}
                                        objectFit="cover"
                                    />
                                </Box>
                                OpenCourseWare
                            </Heading>
                            <Box>
                                <Heading
                                    as={"h5"}
                                    color={"primary"}
                                    fontSize={"xl"}
                                    mb={3}
                                >
                                    Social
                                </Heading>
                                <HStack>
                                    <a
                                        href={"https://github.com/coder-anmol"}
                                        target={"_blank"}
                                        rel={"noreferrer"}
                                    >
                                        <IconButton
                                            icon={<FaGithub />}
                                            color="gray.600"
                                            size={"md"}
                                        />
                                    </a>
                                    <a
                                        href={"https://github.com/coder-anmol"}
                                        target={"_blank"}
                                        rel={"noreferrer"}
                                    >
                                        <IconButton
                                            icon={<FaInstagram />}
                                            color="gray.600"
                                            size={"md"}
                                        />
                                    </a>
                                    <a
                                        href={"https://github.com/coder-anmol"}
                                        target={"_blank"}
                                        rel={"noreferrer"}
                                    >
                                        <IconButton
                                            icon={<FaYoutube />}
                                            color="gray.600"
                                            size={"md"}
                                        />
                                    </a>
                                </HStack>
                            </Box>
                        </Box>

                        {/* Middle */}
                        <Box
                            w={{ md: "400px" }}
                            __css={{
                                "& li": {
                                    mb: "1",
                                    cursor: "pointer",
                                    width: "max-content",

                                    "&:hover": {
                                        color: "primary",
                                    },
                                },
                            }}
                        >
                            <HStack alignItems={"flex-start"}>
                                <Box w={"50%"}>
                                    <Heading
                                        as={"h5"}
                                        color={"primary"}
                                        fontSize={"xl"}
                                        mb={3}
                                    >
                                        Resources
                                    </Heading>
                                    <List>
                                        <Link href={"/login"}>
                                            <ListItem>Home</ListItem>
                                        </Link>
                                        <Link href={"/login"}>
                                            <ListItem>Home</ListItem>
                                        </Link>
                                        <Link href={"/login"}>
                                            <ListItem>Home</ListItem>
                                        </Link>
                                    </List>
                                </Box>

                                <Box w={"50%"}>
                                    <Heading
                                        as={"h5"}
                                        color={"primary"}
                                        fontSize={"xl"}
                                        mb={3}
                                    >
                                        Links
                                    </Heading>
                                    <List>
                                        <Link href={"/login"}>
                                            <ListItem>Home</ListItem>
                                        </Link>
                                        <Link href={"/login"}>
                                            <ListItem>Home</ListItem>
                                        </Link>
                                        <Link href={"/login"}>
                                            <ListItem>Home</ListItem>
                                        </Link>
                                    </List>
                                </Box>
                            </HStack>
                        </Box>
                    </Box>

                    {/* Bottom */}
                    <HStack justify={"center"} py={"6"}>
                        <Box>
                            <Text as="h5" fontSize={"xl"} color={"gray.800"}>
                                &copy; {new Date().getFullYear()} OpenCourseWare
                            </Text>
                        </Box>
                    </HStack>
                </Stack>
            </Container>
        </Box>
    );
}

export default Footer;
