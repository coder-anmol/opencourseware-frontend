import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import DefaultButton from "../Button";
import DarkButton from "../Button/dark";

const ModalDefault = ({
    title,
    children,
    actionName,
    closeName,
    action,
    isOpen,
    onClose,
    ...props
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            isCentered
            motionPreset={"scale"}
            scrollBehavior={"inside"}
            size={{ base: "sm", sm: "md" }}
            {...props}
        >
            <ModalOverlay />
            <ModalContent pb={2}>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton size={"lg"} />
                <ModalBody>{children}</ModalBody>

                {/* <ModalFooter gap={"2"}>
                    <DefaultButton py={"3"} px={"6"} onClick={action}>
                        {actionName}
                    </DefaultButton>
                    <DarkButton py={"3"} px={"6"} onClick={onClose}>
                        {closeName}
                    </DarkButton>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    );
};

export default ModalDefault;
