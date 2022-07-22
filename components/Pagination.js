import {
    HiOutlineChevronLeft as Back,
    HiOutlineChevronRight as Forward,
    HiOutlineChevronDoubleLeft as First,
    HiOutlineChevronDoubleRight as Last,
} from "react-icons/hi";
import { HStack, Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Pagination = ({ count, current, next, previous }) => {
    const router = useRouter();

    return (
        <HStack justify={"center"}>
            <HStack>
                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<First />}
                    cursor={"pointer"}
                    shadow={"sm"}
                    onClick={() => {
                        router.push("/admin/users?page=1");
                    }}
                    disabled={!previous}
                />
                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<Back />}
                    cursor={"pointer"}
                    shadow={"sm"}
                    onClick={() => {
                        router.push(`/admin/users?page=${current - 1}`);
                    }}
                    disabled={!previous}
                />

                <Button
                    variant={"unstyled"}
                    rounded={"lg"}
                    bg={"gray.100"}
                    px={"4 !important"}
                >
                    {current} of {count}
                </Button>
                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<Forward />}
                    cursor={"pointer"}
                    shadow={"sm"}
                    onClick={() => {
                        router.push(`/admin/users?page=${current + 1}`);
                    }}
                    disabled={!next}
                />

                <IconButton
                    rounded={"full"}
                    aria-label="Search database"
                    icon={<Last />}
                    cursor={"pointer"}
                    shadow={"sm"}
                    onClick={() => {
                        router.push(`/admin/users?page=${count}`);
                    }}
                    disabled={!next}
                />
            </HStack>
        </HStack>
    );
};

export default Pagination;
