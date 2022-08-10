import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Heading } from "@chakra-ui/react";

const Index = () => {
    return (
        <AdminWrapper show={true}>
            <Heading>Teacher Index</Heading>
        </AdminWrapper>
    );
};

Index.layout = "teacher";
export default Index;
