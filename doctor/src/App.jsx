import { Routes, Route } from "react-router-dom";

import "./App.css";
import { MainPage } from "./components/pages/main/MainPage.jsx";
import { RegisterPage } from "./components/pages/register/RegisterPage.jsx";
import { LoginPage } from "./components/pages/login/LoginPage.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "./actions/fetchMe.js";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMe());
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/appointments" element={<div>appointments</div>} />
            </Routes>
        </div>
    );
}

export default App;
