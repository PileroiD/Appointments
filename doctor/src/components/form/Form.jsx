/* eslint-disable react/prop-types */

import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { loginValidationSchema } from "./loginValidationSchema";
import { registerValidationSchema } from "./registerValidationSchema";

import { registerUser } from "../../actions/fetchUser";

import { useForm } from "../../hooks/useForm";
import { loginUser } from "../../actions/loginUser";
import { useEffect, useState } from "react";

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

const FormContainer = ({ className, type }) => {
    const dispatch = useDispatch();
    const [serverErrors, setServerErrors] = useState(null);

    const validationSchema =
        type === "register" ? registerValidationSchema : loginValidationSchema;

    const onSubmitAction = type === "register" ? registerUser : loginUser;

    const { formik } = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object(validationSchema),
        onSubmit: (values) => {
            dispatch(onSubmitAction(values)).then((response) => {
                if (response.error) {
                    if (Array.isArray(response.error.response.data)) {
                        setServerErrors(response.error.response.data[0].msg);
                    } else {
                        setServerErrors(response.error.response.data.message);
                    }
                    return;
                }
            });
        },
    });

    useEffect(() => {
        const timerId = setTimeout(() => {
            setServerErrors(null);
        }, 2000);

        return () => clearTimeout(timerId);
    }, [serverErrors]);

    const confirmPasswordView = (formik) => {
        return (
            <>
                <div className="confirm-password-wrapper">
                    <label htmlFor="confirmPassword">Confirm password: </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
            </>
        );
    };

    return (
        <div className={className}>
            {serverErrors ? (
                <div className="error-msg">{serverErrors}</div>
            ) : null}

            <div className="title">
                {type === "register" ? "Registration" : "Log in"}
            </div>
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

                {type === "register" ? confirmPasswordView(formik) : null}

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

export const Form = styled(FormContainer)`
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
        background: lightpink;
        padding: 7px;
        border-radius: 5px;
        text-align: center;
    }
`;
