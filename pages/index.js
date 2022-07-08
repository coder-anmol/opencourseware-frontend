import Hero from "@/components/Hero";
import { Container } from "@chakra-ui/react";

export default function Home() {
    return (
        <Container maxW={"container.xxl"}>
            <Hero />
        </Container>
    );
}
