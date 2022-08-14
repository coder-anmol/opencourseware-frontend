import { Button as ChakraButton } from "@chakra-ui/react";

const Button = (props) => {
    return (
        <ChakraButton
            fontSize={"1.3rem"}
            py={6}
            px={10}
            rounded={"full"}
            bg={"primary"}
            color={"white"}
            _hover={{
                bg: "#2F82FD",
            }}
            _active={{
                bg: "#025BE1",
            }}
            {...props}
        ></ChakraButton>
    );
};

export default Button;
