import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import {
    Heading,
    Box,
    Input,
    InputGroup,
    InputRightElement,
    RadioGroup,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Icon,
    Textarea,
    HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "@/components/Button";
import { BiShow, BiHide } from "react-icons/bi";
import Link from "next/link";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useRouter } from "next/router";

function AddUser() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const initialFields = {
        email: "",
        password: "",
        name: "",
        bio: "",
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

    const validateBio = (value) => {
        let error;
        if (value.length <= 300) {
            error = "";
        } else {
            error = "Bio cannot exceed 300 characters";
        }
        return error;
    };

    const addNewUser = (values, actions) => {
        const data = {
            name: values.name,
            email: values.email,
            password: values.password,
            bio: values.bio,
            is_teacher: values.role == "Teacher" ? true : false,
            is_student: values.role == "Student" ? true : false,
            is_admin: values.role == "Admin" ? true : false,
        };

        Axios.post("users/", data)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "New user was created successfully",
                    type: "success",
                });

                router.push("/admin/users");
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "A user with this email already exists",
                });

                actions.setSubmitting(false);
            });
    };

    return (
        <>
            <AdminWrapper show={true}>
                <Box>
                    <Heading>Add User</Heading>
                </Box>
                <Box pt={8}>
                    <Formik
                        initialValues={initialFields}
                        onSubmit={(values, actions) => {
                            addNewUser(values, actions);
                            // console.log(values);
                            // actions.setSubmitting(false);
                        }}
                    >
                        {(props) => (
                            <Form id="contact">
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
                                <Field
                                    name="password"
                                    validate={validatePassword}
                                >
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

                                {/*bio */}
                                <Field name="bio" validate={validateBio}>
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.bio &&
                                                form.touched.bio
                                            }
                                            mb={3}
                                        >
                                            <FormLabel
                                                fontWeight={"medium"}
                                                fontSize={"lg"}
                                                htmlFor="bio"
                                            >
                                                Bio{" "}
                                            </FormLabel>
                                            <Textarea
                                                {...field}
                                                id="bio"
                                                placeholder="Bio"
                                                size={"lg"}
                                                rows={"6"}
                                                focusBorderColor={"primary"}
                                                errorBorderColor={"danger"}
                                            />
                                            <FormErrorMessage color={"danger"}>
                                                {form.errors.bio}
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
                                                "& input[type=radio]": {
                                                    transform: "scale(1.5)",
                                                    marginRight: "0.5rem",
                                                    marginLeft: "0.2rem",
                                                },
                                            },
                                        }}
                                    >
                                        <HStack gap={4}>
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
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="role"
                                                    value="Admin"
                                                />
                                                Admin
                                            </label>
                                        </HStack>
                                    </RadioGroup>
                                </FormControl>

                                <HStack justify={"end"}>
                                    <Button
                                        mt={4}
                                        isLoading={props.isSubmitting}
                                        type="submit"
                                    >
                                        Create User
                                    </Button>
                                </HStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </AdminWrapper>
        </>
    );
}

AddUser.layout = "admin";
export default AddUser;
