/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Form } from "../../form/Form.jsx";

const AuthPageContainer = ({ className, type }) => {
    const isAuth = useSelector((state) => Object.keys(state.user.data).length);

    if (isAuth) {
        return <Navigate to="/my-appointments" />;
    }

    return (
        <div className={className}>
            <Form type={type} />
        </div>
    );
};

export const AuthPage = styled(AuthPageContainer)`
    margin-top: -50px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
