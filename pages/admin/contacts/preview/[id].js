import {
    Heading,
    Input,
    RadioGroup,
    FormLabel,
    FormControl,
    FormErrorMessage,
    HStack,
    Textarea,
    Avatar,
} from "@chakra-ui/react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Formik, Form, Field } from "formik";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const Preview = () => {
    const [loading, setLoading] = useState(true);
    const [initialFields, setInitialFields] = useState({});
    const router = useRouter();

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

    useEffect(() => {
        if (router.query.id) {
            Axios.get(`contact-us/${router.query.id}`)
                .then((res) => {
                    const { id, name, email, message } = res.data;

                    const initialValues = {
                        id,
                        name,
                        email,
                        message,
                    };

                    setInitialFields(initialValues);
                    setLoading(false);
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: "Unable to fetch contact's data",
                    });
                    router.push("/admin/contacts");
                });
        }
    }, [router.query.id]);

    return (
        <>
            <AdminLoader isLoading={loading} />
            <AdminWrapper show={!loading}>
                <Formik
                    initialValues={initialFields}
                    onSubmit={(values, actions) => {
                        router.push(`/admin/users/edit/${initialFields.id}`);
                    }}
                >
                    {(props) => (
                        <Form id="edit-profile">
                            <Heading fontSize={"3xl"} mb={6}>
                                Contact Preview
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
                                            ></span>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            placeholder="Name"
                                            size={"lg"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                            isDisabled
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
                                            ></span>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            placeholder="Email"
                                            size={"lg"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                            isDisabled
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
                                            ></span>
                                        </FormLabel>
                                        <Textarea
                                            {...field}
                                            id="message"
                                            placeholder="Message"
                                            size={"lg"}
                                            rows={"6"}
                                            focusBorderColor={"primary"}
                                            errorBorderColor={"danger"}
                                            isDisabled
                                        />
                                        <FormErrorMessage color={"danger"}>
                                            {form.errors.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </AdminWrapper>
        </>
    );
};

Preview.layout = "admin";
export default Preview;
