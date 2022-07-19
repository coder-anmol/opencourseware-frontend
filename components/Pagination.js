import {
    HiOutlineChevronLeft as Back,
    HiOutlineChevronRight as Forward,
    HiOutlineChevronDoubleLeft as First,
    HiOutlineChevronDoubleRight as Last,
} from "react-icons/hi";
import { HStack, Button, IconButton } from "@chakra-ui/react";

const Pagination = () => {
    return (
        <HStack justify={"center"}>
            <HStack>
                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<First />}
                    cursor={"pointer"}
                    shadow={"sm"}
                />
                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<Back />}
                    cursor={"pointer"}
                    shadow={"sm"}
                />
                <Button
                    variant={"unstyled"}
                    rounded={"lg"}
                    bg={"gray.100"}
                    px={"4 !important"}
                >
                    1 of 10
                </Button>
                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<Forward />}
                    cursor={"pointer"}
                    shadow={"sm"}
                />
                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<Last />}
                    cursor={"pointer"}
                    shadow={"sm"}
                />
            </HStack>
        </HStack>
    );
};

export default Pagination;
