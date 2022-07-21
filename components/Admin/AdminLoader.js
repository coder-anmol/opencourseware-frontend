import { Box } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";

const AdminLoader = ({ isLoading }) => {
    return (
        isLoading && (
            <Box
                bg={"white"}
                h={"100%"}
                minH={"100%"}
                roundedTop={{ lg: "xl" }}
                shadow={{ lg: "xl" }}
                border={{ lg: "1px" }}
                borderBottom={{ lg: "0px" }}
                borderColor={{ lg: "gray.200" }}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <HashLoader color={"#0d6efd"} size={60} />
            </Box>
        )
    );
};

export default AdminLoader;
