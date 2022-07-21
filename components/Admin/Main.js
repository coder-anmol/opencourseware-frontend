import { Box } from "@chakra-ui/react";

function AdminMain({ children }) {
    return (
        <Box
            h={"100%"}
            mt={"0 !important"}
            p={{ lg: 4 }}
            pb={{ lg: 0 }}
            overflowY={"auto"}
        >
            {children}
        </Box>
    );
}

export default AdminMain;
