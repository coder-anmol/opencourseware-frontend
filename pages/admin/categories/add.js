import AdminWrapper from "@/components/Admin/AdminWrapper";
import {
    Heading,
    Box,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import validator from "validator";
import Button from "@/components/Button";
import { BiShow, BiHide } from "react-icons/bi";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useRouter } from "next/router";

function AddUser() {
    const router = useRouter();

    const initialFields = {
        name: "",
    };

    const validateName = (value) => {
        let error;
        if (value.length >= 3) {
            if (value.length <= 50) {
                error = "";
            } else {
                error =
                    "Category name should not be greater than 30 characters";
            }
        } else {
            error = "Category name should be at least 3 characters";
        }
        return error;
    };

    const addNewCategory = (values, actions) => {
        const data = {
            category_name: values.name,
        };

        Axios.post("category/", data)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "New category was created successfully",
                    type: "success",
                });

                router.push("/admin/categories");
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "A category with this name already exists",
                });

                actions.setSubmitting(false);
            });
    };

    return (
        <>
            <AdminWrapper show={true}>
                <Box>
                    <Heading>Add Category</Heading>
                </Box>
                <Box pt={8}>
                    <Formik
                        initialValues={initialFields}
                        onSubmit={(values, actions) => {
                            addNewCategory(values, actions);
                        }}
                    >
                        {(props) => (
                            <Form id="add-user">
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
                                                Category Name{" "}
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
