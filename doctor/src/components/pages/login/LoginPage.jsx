import styled from "styled-components";
import { LoginForm } from "../../form/LoginForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginPageContainer = ({ className }) => {
    const isAuth = useSelector((state) => Object.keys(state.user.data).length);

    if (isAuth) {
        return <Navigate to="/appointments" />;
    }

    return (
        <div className={className}>
            <LoginForm />
        </div>
    );
};

export const LoginPage = styled(LoginPageContainer)`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
