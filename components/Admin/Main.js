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
                <Box p={4} pb={0}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default AdminMain;
