import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
    MainPage,
    Appointments,
    AuthPage,
    MakeApp,
} from "./components/pages/index.js";
import { fetchMe } from "./actions/fetchMe.js";
import { Header } from "./components/header/Header.jsx";
import { fetchAppointments } from "./actions/fetchAppointments.js";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);

    useEffect(() => {
        dispatch(fetchMe());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [user, dispatch]);

    return (
        <div className="app">
            <Header />

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                />
                <Route path="/login" element={<AuthPage type="login" />} />
                <Route path="/make-appointment" element={<MakeApp />} />
                <Route path="/my-appointments" element={<Appointments />} />
                <Route path="*" element={<MainPage />} />
            </Routes>
        </div>
    );
}

export default App;
