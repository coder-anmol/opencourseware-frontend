import { Button as ChakraButton } from "@chakra-ui/react";

const Button = (props) => {
    return (
        <ChakraButton
            fontSize={"1.3rem"}
            py={6}
            px={10}
            rounded={"full"}
            bg={"dark"}
            color={"white"}
            _hover={{
                bg: "#30363C",
            }}
            _active={{
                bg: "#202427",
            }}
            {...props}
        ></ChakraButton>
    );
};

export default Button;
