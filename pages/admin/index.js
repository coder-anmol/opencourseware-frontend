import AdminWrapper from "@/components/Admin/AdminWrapper";
import Welcome from "@/components/Admin/Welcome";
import { Heading } from "@chakra-ui/react";

const Index = () => {
    return (
        <AdminWrapper show={true}>
            <Welcome text={"Admin."} />
        </AdminWrapper>
    );
};

Index.layout = "admin";
export default Index;
