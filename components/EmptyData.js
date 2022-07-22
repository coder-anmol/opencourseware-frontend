import { Box, AspectRatio, Heading } from "@chakra-ui/react";
import Image from "next/image";

const EmptyData = ({ show }) => {
    return (
        <>
            {show && (
                <Box>
                    <Box>
                        <AspectRatio
                            position={"relative"}
                            px={{ lg: "10%", xl: "22%" }}
                        >
                            <Image
                                alt={"empty data"}
                                src={"/empty-data.svg"}
                                layout={"fill"}
                                objectFit={"contain"}
                            />
                        </AspectRatio>
                        <Heading
                            textAlign={"center"}
                            size={"xl"}
                            mt={{ base: "8", md: "12" }}
                        >
                            Empty Data
                        </Heading>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default EmptyData;
