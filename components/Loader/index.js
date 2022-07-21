import { Box, HStack } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
    return (
        isLoading && (
            <Box
                position={"absolute"}
                top={0}
                bottom={0}
                left={0}
                right={0}
                bg={"light"}
                zIndex={"1000"}
                minH={"100vh"}
                overflow={"hidden"}
            >
                <HStack h={"100vh"} justify={"center"} align={"center"}>
                    <HashLoader
                        color={"#0d6efd"}
                        // speedMultiplier={0.5}
                        size={65}
                    />
                </HStack>
            </Box>
        )
    );
};

export default Loader;
