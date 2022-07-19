import Button from "@/components/Button";
import { Box, AspectRatio, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <Box
            as="section"
            h={"100vh"}
            display={"flex"}
            flexDirection={{ base: "column", lg: "row" }}
            pt={"28"}
            px={{ base: "0" }}
        >
            {/* left hero */}
            <Box
                display={{ sm: "flex" }}
                flexDir={{ sm: "column" }}
                alignItems={{ sm: "center", lg: "flex-start" }}
                px={{ sm: "12", md: "32", lg: "0" }}
                width={{ lg: "50%" }}
                pr={{ lg: "0" }}
                pt={{ lg: "20" }}
            >
                <Heading
                    textTransform={"uppercase"}
                    fontSize={{ base: "3xl", lg: "5xl" }}
                    textAlign={{ sm: "center", lg: "start" }}
                    lineHeight={{ lg: "60px" }}
                >
                    Free and open source community driven platform for seemless
                    learning
                </Heading>
                <Box mt={{ base: "5", lg: "6" }}>
                    <Link href={"/signup"}>
                        <a>
                            <Button>Sign Up</Button>
                        </a>
                    </Link>
                </Box>
            </Box>
            {/* right hero */}
            <AspectRatio
                position={"relative"}
                maxW={{ base: "500px", lg: "600px", xl: "700px" }}
                ratio={1 / 1}
                width={"100%"}
                my={{ base: "14", lg: "0" }}
                mt={{ lg: "-20" }}
                mx={"auto"}
            >
                <Image
                    src={"/hero-img.svg"}
                    layout="fill"
                    objectFit="contain"
                    alt={"hero image"}
                />
            </AspectRatio>
        </Box>
    );
};

export default Hero;
