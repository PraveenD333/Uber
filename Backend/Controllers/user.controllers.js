import blackLToken from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import { createUser } from "../Services/user.service.js";
import { validationResult } from "express-validator";


export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { fullname, email, password, phone } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        phone,
        email,
        password: hPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

export const loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token,);

    res.status(200).json({ token, user });
}

export const getUserProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
}

export const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackLToken.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
}
