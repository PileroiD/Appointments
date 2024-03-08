import { useFormik } from "formik";
import { useState } from "react";

export const useForm = ({ initialValues, validationSchema, onSubmit }) => {
    const [errors, setErrors] = useState(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values, setErrors);
        },
    });

    return { formik, errors };
};
