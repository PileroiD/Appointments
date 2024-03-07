/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../actions/fetchUser";
import { loginUser } from "../../actions/loginUser";
import { useState } from "react";

const Input = styled.input`
    width: 400px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
`;

const Button = styled.button`
    width: 200px;
    margin-top: 20px;
    height: 30px;
    background: lightgreen;
    border: none;
    border-radius: 5px;

    ${({ disabled }) => (disabled ? "cursor: auto;" : "cursor: pointer;")}
`;

const LoginFormContainer = ({ className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(8, "")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    "The password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                )
                .required("Password is required"),
        }),
        onSubmit: (values) => onSubmit(values),
    });

    const onSubmit = (values) => {
        dispatch(loginUser(values)).then((response) => {
            if (response.error) {
                console.log("response :>> ", response);
                if (Array.isArray(response.error.response.data)) {
                    setErrors(response.error.response.data[0].msg);
                } else {
                    setErrors(response.error.response.data.message);
                }
                return;
            }
            navigate("/appointments");
        });
    };

    return (
        <div className={className}>
            {errors ? <div className="error-msg">{errors}</div> : null}

            <div className="title">Log in</div>
            <form className="form" onSubmit={formik.handleSubmit}>
                <div className="email-wrapper">
                    <label htmlFor="email">Email: </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.errors.email && formik.touched.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}

                <div className="password-wrapper">
                    <label htmlFor="password">Password: </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.errors.password && formik.touched.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}

                <Button
                    disabled={Object.keys(formik.errors).length}
                    type="submit"
                >
                    Отправить
                </Button>
            </form>
        </div>
    );
};

export const LoginForm = styled(LoginFormContainer)`
    & .title {
        font-size: 40px;
        font-family: "Dancing Script", sans-serif;
    }

    & .form {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: end;
        border: 1px solid black;
        padding: 40px;
        border-radius: 10px;

        & input {
            width: 400px;
            height: 40px;
            border-radius: 20px;
            border: 1px solid black;
            margin-top: 10px;
            padding: 10px;
        }

        & .error {
            color: red;
            margin-top: 5px;
            margin-right: 50%;
            transform: translateX(50%);
        }
    }

    & .error-msg {
        color: red;
    }
`;
