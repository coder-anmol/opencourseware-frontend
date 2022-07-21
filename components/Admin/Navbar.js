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
import useStore from "store";
import swal from "@sweetalert/with-react";

const AdminNavbar = ({ onOpen }) => {
    const userData = useStore((state) => state.userData);
    const logout = useStore((state) => state.logoutUser);

    return (
        <HStack
            h={"76px"}
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
                            name={userData.name}
                            src={userData.profile_image}
                            cursor={"pointer"}
                        />
                    }
                    variant="unstyled"
                    marginInline={"0 !important"}
                    display={"flex"}
                    alignItems={"center"}
                />
                <MenuList>
                    <Link href={"/"}>
                        <a>
                            <MenuItem>Main Site</MenuItem>
                        </a>
                    </Link>
                    <Link href={"/profile"}>
                        <a>
                            <MenuItem>Profile</MenuItem>
                        </a>
                    </Link>
                    <MenuItem
                        onClick={() => {
                            logout();
                            swal({
                                title: "Logged Out",
                                icon: "success",
                                text: "You have been logged out",
                                type: "success",
                            });
                        }}
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );
};

export default AdminNavbar;
