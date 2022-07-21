import {
    Input,
    InputGroup,
    InputRightElement,
    RadioGroup,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Container,
    Box,
    HStack,
    Icon,
    Heading,
    Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "@/components/Button";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useRouter } from "next/router";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const initialFields = {
        email: "",
        password: "",
        name: "",
        role: "Student",
    };

    const validateName = (value) => {
        let error;
        if (value.length >= 3) {
            if (value.length <= 50) {
                error = "";
            } else {
                error = "Name should not be greater than 50 characters";
            }
        } else {
            error = "Name should be at least 3 characters";
        }
        return error;
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

    const signUpUser = (values, actions) => {
        const data = {
            name: values.name,
            email: values.email,
            password: values.password,
            is_teacher: values.role == "Teacher" ? true : false,
            is_student: values.role == "Student" ? true : false,
        };

        Axios.post("auth/signup", data)
            .then((res) => {
                swal({
                    title: "Signup Successfull",
                    icon: "success",
                    text: "You signup was successfull, please login now",
                    type: "success",
                });

                actions.resetForm(initialFields);

                router.push("/login");
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Signup Failed",
                    text: "A user with this email already exists",
                });

                actions.setSubmitting(false);
            });
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
                        signUpUser(values, actions);
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
                                Sign Up
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
                                            htmlFor="email"
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

                            {/* role */}

                            <FormControl mb={6}>
                                <FormLabel
                                    fontWeight={"medium"}
                                    fontSize={"lg"}
                                    htmlFor="name"
                                >
                                    Role{" "}
                                    <span
                                        style={{
                                            color: "var(--chakra-colors-danger)",
                                        }}
                                    >
                                        *
                                    </span>
                                </FormLabel>
                                <RadioGroup
                                    fontSize={"lg"}
                                    __css={{
                                        "& label": {
                                            cursor: "pointer",
                                            marginRight: "1rem",
                                            "& input[type=radio]": {
                                                transform: "scale(1.5)",
                                                marginRight: "0.5rem",
                                                marginLeft: "0.2rem",
                                            },
                                        },
                                    }}
                                >
                                    <HStack>
                                        <label>
                                            <Field
                                                type="radio"
                                                name="role"
                                                value="Student"
                                            />
                                            Student
                                        </label>
                                        <label>
                                            <Field
                                                type="radio"
                                                name="role"
                                                value="Teacher"
                                            />
                                            Teacher
                                        </label>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>

                            <HStack justify={"center"}>
                                <Button
                                    mt={4}
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                            </HStack>

                            <HStack mt={"9"}>
                                <Text>
                                    {" "}
                                    {"Already have an account?"}{" "}
                                    <Link href={"/login"}>
                                        <span
                                            style={{
                                                color: "var(--chakra-colors-primary)",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Login
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

export default Signup;
