import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import { Container } from "@chakra-ui/react";

export default function Home() {
    return (
        <Container maxW={"container.xxl"}>
            <Hero />
            {/* Todo: Contact */}
            <Contact />
            {/* Todo: Faq */}
        </Container>
    );
}
