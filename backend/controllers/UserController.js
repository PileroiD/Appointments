import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secret_jwt_key = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        const user = await UserModel.create({
            email: req.body.email,
            passwordHash: hash,
        });

        const token = jwt.sign(
            {
                _id: user._id,
            },
            secret_jwt_key,
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (e) {
        console.log("error :>> ", e);

        if (e.code === 11000) {
            return res.status(500).json({
                message: "Email already exists",
            });
        }

        return res.status(500).json({
            message: "Failed to register",
        });
    }
};

const loginUser = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
        console.log("User not found");
        return res.status(400).json({
            message: "Invalid login or password",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
    );

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid login or password",
        });
    }

    const token = jwt.sign(
        {
            _id: user._id,
        },
        secret_jwt_key,
        {
            expiresIn: "30d",
        }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
        ...userData,
        token,
    });
};

const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log("error :>>", error);
        res.status(403).json({
            message: "No access",
        });
    }
};

export default { registerUser, loginUser, getMe };
