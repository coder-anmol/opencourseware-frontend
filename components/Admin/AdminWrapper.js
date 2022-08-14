import { Box } from "@chakra-ui/react";

function AdminWrapper({ show, children }) {
    return (
        show && (
            <Box
                bg={"white"}
                h={"max-content"}
                minH={"100%"}
                roundedTop={{ lg: "xl" }}
                shadow={{ lg: "xl" }}
                border={{ lg: "1px" }}
                borderBottom={{ lg: "0px" }}
                borderColor={{ lg: "gray.200" }}
            >
                <Box p={4}>{children}</Box>
            </Box>
        )
    );
}

export default AdminWrapper;
