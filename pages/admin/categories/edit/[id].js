import {
    Heading,
    Input,
    FormLabel,
    FormControl,
    FormErrorMessage,
    HStack,
} from "@chakra-ui/react";
import AdminLoader from "@/components/Admin/AdminLoader";
import AdminWrapper from "@/components/Admin/AdminWrapper";
import { Formik, Form, Field } from "formik";
import Axios from "utils/fetcher";
import swal from "@sweetalert/with-react";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const EditId = () => {
    const [loading, setLoading] = useState(true);
    const [initialFields, setIntialFields] = useState({ id: "", name: "" });
    const router = useRouter();

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

    const updateCategory = (values, actions) => {
        const data = {
            category_name: values.name,
        };

        Axios.patch(`category/${initialFields.id}/`, data)
            .then((res) => {
                swal({
                    title: "Action Successfull",
                    icon: "success",
                    text: "Category was updated successfully",
                    type: "success",
                });

                router.push("/admin/categories");
            })
            .catch((err) => {
                swal({
                    icon: "error",
                    title: "Action Failed",
                    text: "Unable to update category",
                });

                actions.setSubmitting(false);
            });
    };

    useEffect(() => {
        if (router.query.id) {
            Axios.get("category/all/")
                .then((res) => {
                    const category = res.data.results.filter(
                        (i) => i.id == router.query.id
                    )[0];

                    if (category) {
                        setIntialFields({
                            id: category.id,
                            name: category.category_name,
                        });
                        setLoading(false);
                    } else {
                        swal({
                            icon: "error",
                            title: "No Data Found",
                            text: `Unable to find the category by this id.`,
                        });
                        router.push("/admin/categories");
                    }
                })
                .catch((err) => {
                    swal({
                        icon: "error",
                        title: "Data Fetching Failed",
                        text: `Unable to fetch data`,
                    });
                    router.push("/admin/categories");
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
                        updateCategory(values, actions);
                    }}
                >
                    {(props) => (
                        <Form id="edit-category">
                            <Heading fontSize={"3xl"} mb={6}>
                                Edit Category
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
                                    Update Category
                                </Button>
                            </HStack>
                        </Form>
                    )}
                </Formik>
            </AdminWrapper>
        </>
    );
};

EditId.layout = "admin";
export default EditId;
