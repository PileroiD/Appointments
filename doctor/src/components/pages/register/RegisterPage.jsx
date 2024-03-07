import styled from "styled-components";
import { RegisterForm } from "../../form/RegisterForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RegisterPageContainer = ({ className }) => {
    const isAuth = useSelector((state) => Object.keys(state.user.data).length);

    if (isAuth) {
        return <Navigate to="/appointments" />;
    }

    return (
        <div className={className}>
            <RegisterForm />
        </div>
    );
};

export const RegisterPage = styled(RegisterPageContainer)`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
