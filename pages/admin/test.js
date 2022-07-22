import ModalDefault from "@/components/Modal";
import TableDemo from "@/components/TableDemo";
import { Box, Button, useDisclosure, Text } from "@chakra-ui/react";
import swal from "@sweetalert/with-react";
import Axios from "utils/fetcher";
import { useEffect, useState } from "react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";

const Index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get("users/")
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    function action() {
        console.log("some action");
        onClose();
    }

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
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
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
                        <Text>
                            sdjfkjklsdjflsdjf kldsjkflsjdkfjsdsdjfkj sdkfjlsdjl
                        </Text>
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

                    <Box my={4}></Box>
                </Box>
            </AdminWrapper>
        </>
    );
};

Index.layout = "admin";
export default Index;
