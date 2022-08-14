import { Heading, Box } from "@chakra-ui/react";

const Category = ({ children, ...props }) => {
    return (
        <Box
            border={"1px"}
            borderColor={"gray.200"}
            rounded={"lg"}
            px={{ base: "4" }}
            py={{ base: "1" }}
            width={"max-content"}
            cursor={"pointer"}
            transition={"all 300ms ease-in-out"}
            bg={"gray.50"}
            shadow={"md"}
            ml={"0 !important"}
            _hover={{
                bg: "gray.200",
            }}
            {...props}
        >
            <Heading fontSize={{ base: "2xl" }} fontWeight={"light"}>
                {children}
            </Heading>
        </Box>
    );
};

export default Category;
