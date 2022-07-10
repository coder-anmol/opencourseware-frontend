import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import { Container } from "@chakra-ui/react";

export default function Home() {
    return (
        <Container maxW={"container.xxl"}>
            <Hero />
            {/* Todo: Faq */}
            <Faq />
        </Container>
    );
}
