import { body } from "express-validator";

export const registerValidation = [
    body("email", "Invalid email format").isEmail(),
    body(
        "password",
        "The password must be at least 5 characters long"
    ).isLength({ min: 5 }),
];
