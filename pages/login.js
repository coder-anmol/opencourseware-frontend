import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    HStack,
    Container,
    Box,
    InputGroup,
    InputRightElement,
    Icon,
    Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "@/components/Button";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialFields = {
        email: "",
        password: "",
    };

    const validatePassword = (value) => {
        let error;
        if (
            validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
        ) {
            if (value.length > 30) {
                error = "Password length cannot exceed 30 characters";
            } else {
                error = "";
            }
        } else {
            error =
                "Password must be 8 characters long, containing at least one of capital, small, numeric and special character";
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

    return (
        <Container maxW={"container.sm"}>
            <Box
                mt={{ base: "28", lg: "36" }}
                mb={{ base: "20", lg: "28" }}
                p={"6"}
                rounded={"3xl"}
                bg={"white"}
                shadow={"xl"}
            >
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
                            style={{
                                margin: "var(--chakra-sizes-4) 0",
                            }}
                        >
                            <Heading
                                fontSize={"3xl"}
                                textAlign={"center"}
                                mb={4}
                            >
                                Login
                            </Heading>

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

                            {/*password */}
                            <Field name="password" validate={validatePassword}>
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.password &&
                                            form.touched.password
                                        }
                                        mb={3}
                                    >
                                        <FormLabel
                                            fontWeight={"medium"}
                                            fontSize={"lg"}
                                            htmlFor="name"
                                        >
                                            Password{" "}
                                            <span
                                                style={{
                                                    color: "var(--chakra-colors-danger)",
                                                }}
                                            >
                                                *
                                            </span>
                                        </FormLabel>
                                        <InputGroup>
                                            <Input
                                                {...field}
                                                id="password"
                                                placeholder="Password"
                                                size={"lg"}
                                                focusBorderColor={"primary"}
                                                errorBorderColor={"danger"}
                                                type={
                                                    !showPassword
                                                        ? "password"
                                                        : "text"
                                                }
                                            />
                                            <InputRightElement
                                                pt={"2"}
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                cursor={"pointer"}
                                                fontSize={"xl"}
                                                color={"gray.700"}
                                            >
                                                <Icon
                                                    as={
                                                        showPassword
                                                            ? BiShow
                                                            : BiHide
                                                    }
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.password}
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
                                    Login
                                </Button>
                            </HStack>

                            <HStack mt={"9"}>
                                <Text>
                                    {" "}
                                    {"Don't have an account?"}{" "}
                                    <Link href={"/signup"}>
                                        <span
                                            style={{
                                                color: "var(--chakra-colors-primary)",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Sign up
                                        </span>
                                    </Link>
                                </Text>
                            </HStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Login;
