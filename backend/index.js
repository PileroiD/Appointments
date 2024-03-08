import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { UserController, AppointmentController } from "./controllers/index.js";
import handleValidationError from "./utils/handleValidationError.js";
import { registerValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";

const port = 4444;

const app = express();
app.use(express.json());
app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);

dotenv.config();
const db = process.env.DATABASE_ACCESS;

mongoose
    .connect(db)
    .then(() => {
        console.log("DB ok");
    })
    .catch((error) => {
        console.log(`DB error: ${error}`);
    });

app.post(
    "/register",
    registerValidation,
    handleValidationError,
    UserController.registerUser
);

app.post(
    "/login",
    registerValidation,
    handleValidationError,
    UserController.loginUser
);

app.get("/getme", checkAuth, UserController.getMe);

app.post("/add-app", checkAuth, AppointmentController.addApp);

app.get("/get-apps", checkAuth, AppointmentController.getAll);

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK");
});
