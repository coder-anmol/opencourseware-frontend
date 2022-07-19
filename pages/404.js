import Button from "@/components/Button/dark";
import { Stack, Box, AspectRatio, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

function Error404() {
    return (
        <Stack
            h={{ base: "max-content" }}
            justify={{ base: "top", lg: "center" }}
            align={"center"}
        >
            <Box my={{ base: "44" }}>
                <AspectRatio
                    position={"relative"}
                    ratio={4 / 3}
                    width={{ base: "300px", lg: "600px" }}
                >
                    <Image alt="404 Error" src={"/404.svg"} layout={"fill"} />
                </AspectRatio>
                <HStack justify={"center"} mt={{ base: "6", lg: "14" }}>
                    <Link href={"/"}>
                        <Button>Go To Homepage</Button>
                    </Link>
                </HStack>
            </Box>
        </Stack>
    );
}

export default Error404;
