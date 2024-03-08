/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMatch } from "react-router-dom";

const HeaderContainer = ({ className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.data);
    const match = useMatch("/my-appointments");

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOG_OUT" });
        dispatch({ type: "SET_APPOINTMENTS", payload: {} });

        navigate("/");
    };

    return (
        <div className={className}>
            {Object.keys(user).length ? (
                <>
                    {match ? (
                        <Link className="add-app" to="/make-appointment">
                            Добавить запись
                        </Link>
                    ) : null}
                    <div className="user-email">{user.email}</div>
                    <div onClick={logout} className="logout">
                        Log out
                    </div>
                </>
            ) : (
                <>
                    <div className="log-sign-btns">
                        <Link to="/login">Log in</Link>
                        <Link to="/register">Sign up</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export const Header = styled(HeaderContainer)`
    height: 50px;
    background: #dddddd;
    display: flex;
    justify-content: space-between;
    padding: 0 40px 0 40px;
    align-items: center;
    column-gap: 20px;

    & .logout,
    a {
        cursor: pointer;
        border: 1px solid gray;
        padding: 6px;
        border-radius: 5px;
        text-decoration: none;
        color: #000;
    }

    & .log-sign-btns {
        display: flex;
        column-gap: 10px;
    }
`;
