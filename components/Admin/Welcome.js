import { Heading, HStack } from "@chakra-ui/react";

const Welcome = ({ text }) => {
    return (
        <HStack justify={"center"}>
            <Heading textAlign={"center"} size={"2xl"} lineHeight={"70px"}>
                Welcome To OpenCourseWare <br /> {text}
            </Heading>
        </HStack>
    );
};

export default Welcome;
