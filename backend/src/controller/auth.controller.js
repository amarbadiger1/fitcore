import { registerSchema, loginSchema } from "../validations/user.validation.js";
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config.js";
export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body

        const validation = registerSchema.safeParse({ firstname, lastname, email, password })

        if (!validation.success) {
            return res.status(400).json({
                message: "Inputs are not valid",
                errors: validation.error.errors
            })
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await userModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            message: "User created successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validation = loginSchema.safeParse({ email, password })

        if (!validation.success) {
            return res.status(200).json({
                message: "Inputs are not valid",
                error: validation.error.errors
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }


        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,      // 🔐 prevents JS access (XSS safe)
            secure: false,       // true in production (HTTPS)
            sameSite: "strict",  // CSRF protection
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        });


        return res.status(200).json({
            message: "Login successful"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token");

    return res.json({
        message: "Logged out successfully"
    });
}
