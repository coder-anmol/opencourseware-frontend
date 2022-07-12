import ModalDefault from "@/components/Modal";
import { Box, Button, useDisclosure, Text } from "@chakra-ui/react";

const Index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    function action() {
        console.log("some action");
        onClose();
    }

    return (
        <Box>
            <ModalDefault
                isOpen={isOpen}
                onClose={onClose}
                title={"Modal Default"}
                action={action}
                actionName={"Go Ahead"}
                closeName={"Cancel"}
            >
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
                <Text>sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl</Text>
            </ModalDefault>
            <Button onClick={onOpen}>Open Modal</Button>
        </Box>
    );
};

Index.layout = "admin";
export default Index;
