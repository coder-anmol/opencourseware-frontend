import AsideNavbar from "@/components/Admin/AsideNav";
import AdminNavbar from "@/components/Admin/Navbar";
import AdminMain from "@/components/Admin/Main";
import { Box, Stack, useDisclosure } from "@chakra-ui/react";

const AdminLayout = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
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
                />
            </Box>
            <Stack ml={{ lg: "250px" }} h={"100vh"}>
                {/* Admin Navbar */}
                <AdminNavbar onOpen={onOpen} />

                {/* Admin Main */}
                <AdminMain>{children}</AdminMain>
            </Stack>
        </>
    );
};

export default AdminLayout;