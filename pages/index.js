import { Container, Heading, Text, Box } from "@chakra-ui/react";

export default function Home() {
    return (
        <Box bg={"light"}>
            <Container maxW={"container.xl"}>
                <Box py={5}>
                    <Heading>HomePage Testing</Heading>
                    {[...new Array(10).keys()].map((i) => {
                        return (
                            <Text my={10} fontSize={"3xl"} key={i}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Cum perspiciatis eveniet totam
                                autem velit tempore libero numquam illum sit eos
                                earum fugit nesciunt quam eligendi commodi ut,
                                temporibus magnam eaque aut aliquam. Aut, illo
                                quod reiciendis repudiandae nemo quisquam facere
                                vitae ad dolor itaque enim! Nam olore aperiam
                                dolor totam, soluta magni maiores esse nesciunt
                                deserunt. A optio consequatur quibusdam nisi
                                reiciendis exercitationem!
                            </Text>
                        );
                    })}
                </Box>
            </Container>
        </Box>
    );
}
