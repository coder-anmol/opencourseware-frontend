import ModalDefault from "@/components/Modal";
import TableDemo from "@/components/TableDemo";
import { Box, Button, useDisclosure, Text } from "@chakra-ui/react";
import swal from "@sweetalert/with-react";

const Index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    function action() {
        console.log("some action");
        onClose();
    }

    return (
        <Box>
            {/* Table Component Explained */}
            <Box>
                <TableDemo />
            </Box>

            {/* Modal Usage Explained */}
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

            <Box my={4}>
                <Button onClick={onOpen}>Open Modal</Button>
                <Button
                    onClick={() => {
                        swal({
                            text: "How was your experience getting help with this issue?",
                            icon: "success",
                            buttons: {
                                cancel: "Close",
                            },
                        });
                    }}
                >
                    Sweet Alert
                </Button>
            </Box>
        </Box>
    );
};

Index.layout = "admin";
export default Index;