import * as Yup from "yup";

export const loginValidationSchema = {
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .min(8, "")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "The password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        )
        .required("Password is required"),
};
