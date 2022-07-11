import AsideNavbar from "@/components/Admin/AsideNav";
import AdminNavbar from "@/components/Admin/Navbar";
import AdminMain from "@/components/Admin/Main";
import { HStack, Stack, useDisclosure } from "@chakra-ui/react";

const AdminLayout = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <HStack h={"100vh"} gap={"0"}>
            {/*Aside Navbar  */}
            <AsideNavbar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

            {/* Right Section */}
            <Stack w={"100%"} h={"100vh"} marginInline={"0 !important"}>
                {/* Navbar */}
                <AdminNavbar onOpen={onOpen} />

                {/* Main */}
                <AdminMain>{children}</AdminMain>
            </Stack>
        </HStack>
    );
};

export default AdminLayout;
