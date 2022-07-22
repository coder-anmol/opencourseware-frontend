import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Heading } from "@chakra-ui/react";

const Index = () => {
    return (
        <AdminWrapper show={true}>
            <Heading>Admin Index</Heading>
        </AdminWrapper>
    );
};

Index.layout = "admin";
export default Index;
