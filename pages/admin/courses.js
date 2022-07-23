import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Box, Heading } from "@chakra-ui/react";

const Index = () => {
    return (
        <AdminWrapper show={true}>
            <Box>
                <Heading>Courses</Heading>
            </Box>
        </AdminWrapper>
    );
};

Index.layout = "admin";
export default Index;
