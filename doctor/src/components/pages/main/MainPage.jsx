import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Button = styled.button`
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    font-size: 20px;

    &:hover {
        background: darkred;
    }
`;

const MainPageContainer = ({ className }) => {
    const isAuth = useSelector((state) => Object.keys(state.user.data).length);

    if (isAuth) {
        return <Navigate to="/appointments" />;
    }

    return (
        <div className={className}>
            <div className="buttons-wrapper">
                <Link to="/login">
                    <Button>Log in</Button>
                </Link>

                <Link to="/register">
                    <Button>Sign up</Button>
                </Link>
            </div>
            <div className="title">Appointments</div>
        </div>
    );
};

export const MainPage = styled(MainPageContainer)`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    column-gap: 20px;

    & .buttons-wrapper {
        display: flex;
        column-gap: 20px;
    }

    & .title {
        margin-top: 30px;
        font-size: 40px;
        font-family: "Dancing Script", sans-serif;
    }
`;
