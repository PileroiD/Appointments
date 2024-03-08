/* eslint-disable react/prop-types */
import styled from "styled-components";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../../actions/addAppointment.js";

const MakeAppContainer = ({ className }) => {
    const [nameValue, setNameValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [problemValue, setProblemValue] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);

    const dispatch = useDispatch();

    const isAuth = useSelector((state) => Object.keys(state.user.data).length);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setIsSuccess(false);
        }, 2000);

        return () => clearTimeout(timerId);
    }, [isSuccess]);

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: nameValue,
            phone: phoneValue,
            problem: problemValue,
        };

        dispatch(addAppointment(data)).then(() => {
            setNameValue("");
            setPhoneValue("");
            setProblemValue("");
            setIsSuccess(true);
        });
    };

    return (
        <div className={className}>
            {isSuccess ? (
                <div className="success">Запись была добавлена</div>
            ) : null}

            <div className="form-wrapper">
                <form className="form" onSubmit={onSubmit}>
                    <label htmlFor="name">ФИО</label>
                    <input
                        required
                        className="name"
                        type="text"
                        name="name"
                        value={nameValue}
                        onChange={({ target }) => setNameValue(target.value)}
                    />

                    <label htmlFor="name">Номер телефона</label>
                    <InputMask
                        required
                        mask="+1 (999) 999-9999"
                        maskChar="_"
                        value={phoneValue}
                        onChange={({ target }) => setPhoneValue(target.value)}
                        placeholder="Введите номер телефона"
                    />

                    <label htmlFor="name">Опишите вашу проблему</label>
                    <textarea
                        className="problem"
                        type="text"
                        name="problem"
                        value={problemValue}
                        onChange={({ target }) => setProblemValue(target.value)}
                    />

                    <button
                        disabled={isSuccess}
                        type="submit"
                        className="submit-btn"
                    >
                        Отправить
                    </button>
                </form>
            </div>
            <Link className="my-apps" to="/my-appointments">
                Посмотреть мои записи
            </Link>
        </div>
    );
};

export const MakeApp = styled(MakeAppContainer)`
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    & .form {
        width: 500px;
        display: flex;
        flex-direction: column;
    }

    & input {
        height: 30px;
        padding: 6px;
        border-radius: 5px;
        border: 1px solid black;
        margin-bottom: 10px;
    }

    & textarea {
        padding: 6px;
    }

    & .submit-btn {
        width: 200px;
        margin: 0 auto;
        margin-top: 10px;
        height: 30px;
    }

    & .my-apps {
        margin-top: 10px;
        color: green;
    }

    & .success {
        background: lightgreen;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid green;
    }
`;
