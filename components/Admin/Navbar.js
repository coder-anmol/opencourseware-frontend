import {
    HStack,
    IconButton,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";

const AdminNavbar = ({ onOpen }) => {
    return (
        <HStack
            h={"74px"}
            bg={"primary"}
            borderBottom={"1px"}
            borderColor={"gray.200"}
            shadow={"lg"}
            justify={{ base: "space-between", lg: "flex-end" }}
            px={"4"}
            position={"sticky"}
            top={"0"}
        >
            {/* Hamburger Button */}
            <IconButton
                as={HiMenu}
                variant={"unstyled"}
                color={"white"}
                size={"sm"}
                cursor={"pointer"}
                onClick={onOpen}
                display={{ lg: "none" }}
            />

            {/* Avatar Menu*/}
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={
                        <Avatar
                            name="Ryan Florence"
                            src="https://bit.ly/ryan-florence"
                            cursor={"pointer"}
                        />
                    }
                    variant="unstyled"
                    marginInline={"0 !important"}
                    display={"flex"}
                    alignItems={"center"}
                />
                <MenuList>
                    <Link href={"/dashboard"}>
                        <a>
                            <MenuItem>Dashboard</MenuItem>
                        </a>
                    </Link>
                    <Link href={"/profile"}>
                        <a>
                            <MenuItem>Profile</MenuItem>
                        </a>
                    </Link>
                    <Link href={"/"}>
                        <a>
                            <MenuItem>Logout</MenuItem>
                        </a>
                    </Link>
                </MenuList>
            </Menu>
        </HStack>
    );
};

export default AdminNavbar;
