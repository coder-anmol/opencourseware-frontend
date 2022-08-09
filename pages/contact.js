import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    Heading,
    HStack,
    Container,
    Box,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "@/components/Button";
import Axios from "utils/fetcher";
import { useRouter } from "next/router";

const Contact = () => {
    const router = useRouter();
    const initialFields = {
        name: "",
        email: "",
        message: "",
    };

    const validateName = (value) => {
        let error;
        if (value.length >= 3) {
            if (value.length <= 100) {
                error = "";
            } else {
                error = "Name cannot exceed 100 characters";
            }
        } else {
            error = "Name should be at least 3 characters";
        }
        return error;
    };

    const validateEmail = (value) => {
        let error;
        if (validator.isEmail(value)) {
            error = "";
        } else {
            error = "Email is not valid";
        }
        return error;
    };

    const validateMessage = (value) => {
        let error;
        if (value.length >= 20) {
            if (value.length <= 300) {
                error = "";
            } else {
                error = "Message cannot exceed 300 characters";
            }
        } else {
            error = "Message should be at least 20 characters";
        }
        return error;
    };

    function submitContact(values, actions) {
        const data = {
            name: values.name,
            email: values.email,
            message: values.message,
        };
        Axios.post("contact-us/", data)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Contact message is posted",
                    type: "success",
                });
                router.push("/");
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to post contact message",
                });
                actions.setSubmitting(false);
            });
    }

    return (
        <Container maxW={"container.lg"}>
            <Box
                mt={{ base: "28", lg: "36" }}
                mb={{ base: "20", lg: "28" }}
                pt={"1"}
                pb={"1"}
                px={"6"}
                rounded={"3xl"}
                bg={"white"}
                shadow={"2xl"}
            >
                <Formik
                    initialValues={initialFields}
                    onSubmit={(values, actions) => {
                        submitContact(values, actions);
                    }}
                >
                    {(props) => (
                        <Form
                            id="contact"
                            style={{
                                margin: "var(--chakra-sizes-16) 0",
                            }}
                        >
                            <Heading
                                fontSize={"3xl"}
                                textAlign={"center"}
                                mb={4}
                            >
                                Contact Us
                            </Heading>

                            {/*name */}
                            <Field name="name" validate={validateName}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.name &&
                                            form.touched.name
                                        }
                                        mb={3}
                                    >
                                        <FormLabel
                                            fontWeight={"medium"}
                                            fontSize={"lg"}
                                            htmlFor="name"
                                        >
                                            Name{" "}
                                            <span
                                                style={{
                                                    color: "var(--chakra-colors-danger)",
                                                }}
                                            >
                                                *
                                            </span>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            placeholder="Name"
                                            size={"lg"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                        />
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.name}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/*email */}
                            <Field name="email" validate={validateEmail}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.email &&
                                            form.touched.email
                                        }
                                        mb={3}
                                    >
                                        <FormLabel
                                            fontWeight={"medium"}
                                            fontSize={"lg"}
                                            htmlFor="email"
                                        >
                                            Email{" "}
                                            <span
                                                style={{
                                                    color: "var(--chakra-colors-danger)",
                                                }}
                                            >
                                                *
                                            </span>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            placeholder="Email"
                                            size={"lg"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                        />
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.email}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/*message */}
                            <Field name="message" validate={validateMessage}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.message &&
                                            form.touched.message
                                        }
                                        mb={3}
                                    >
                                        <FormLabel
                                            fontWeight={"medium"}
                                            fontSize={"lg"}
                                            htmlFor="email"
                                        >
                                            Message{" "}
                                            <span
                                                style={{
                                                    color: "var(--chakra-colors-danger)",
                                                }}
                                            >
                                                *
                                            </span>
                                        </FormLabel>
                                        <Textarea
                                            {...field}
                                            id="message"
                                            placeholder="Message"
                                            size={"lg"}
                                            rows={"6"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                        />
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <HStack justify={"center"}>
                                <Button
                                    mt={4}
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </HStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Contact;
