import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    Heading,
    HStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "./Button";

/*
validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
*/

const Contact = () => {
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

    return (
        <Formik
            initialValues={initialFields}
            onSubmit={(values, actions) => {
                console.log("submitted");
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    actions.resetForm(initialFields);
                }, 1000);
            }}
        >
            {(props) => (
                <Form
                    id="contact"
                    style={{ margin: "var(--chakra-sizes-16) 0" }}
                >
                    <Heading fontSize={"3xl"} textAlign={"center"} mb={4}>
                        Contact Us
                    </Heading>

                    {/*name */}
                    <Field name="name" validate={validateName}>
                        {({ field, form }) => (
                            <FormControl
                                isInvalid={
                                    form.errors.name && form.touched.name
                                }
                                mb={3}
                            >
                                <FormLabel
                                    fontWeight={"medium"}
                                    fontSize={"lg"}
                                    htmlFor="name"
                                >
                                    Name
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
                                    form.errors.email && form.touched.email
                                }
                                mb={3}
                            >
                                <FormLabel
                                    fontWeight={"medium"}
                                    fontSize={"lg"}
                                    htmlFor="email"
                                >
                                    Email
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
                                    form.errors.message && form.touched.message
                                }
                                mb={3}
                            >
                                <FormLabel
                                    fontWeight={"medium"}
                                    fontSize={"lg"}
                                    htmlFor="email"
                                >
                                    Message
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
    );
};

export default Contact;
