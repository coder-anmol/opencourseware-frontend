import AsideNavbar from "@/components/Admin/AsideNav";
import AdminNavbar from "@/components/Admin/Navbar";
import AdminMain from "@/components/Admin/Main";
import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useStore from "store";
import { useRouter } from "next/router";
import { checkRole } from "store";

const TeacherLayout = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const user = useStore((state) => state.user);
    const userData = useStore((state) => state.userData);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (userData) {
                if (checkRole(userData, "teacher")) {
                    setLoading(false);
                } else {
                    router.push("/");
                }
            }
        } else {
            router.push("/login");
        }
    }, [user, userData]);

    return (
        !loading && (
            <>
                <Box
                    position={"fixed"}
                    top={"0"}
                    bottom={"0"}
                    left={"0"}
                    overflowY={"auto"}
                    w={"100%"}
                    maxW={"250px"}
                    px={"0"}
                    bg={"primary"}
                    display={{ base: "none", lg: "block" }}
                    shadow={"xl"}
                >
                    {/* Aside Navbar */}
                    <AsideNavbar
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpen={onOpen}
                        teacher={true}
                    />
                </Box>
                <Stack ml={{ lg: "250px" }} h={"100vh"}>
                    {/* Admin Navbar */}
                    <AdminNavbar onOpen={onOpen} />

                    {/* Admin Main */}
                    <AdminMain>{children}</AdminMain>
                </Stack>
            </>
        )
    );
};

export default TeacherLayout;
