import blackLToken from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import jwt from "jsonwebtoken";


export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    const isblacklisted = await blackLToken.findOne({ token: token });
    if (isblacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select('-password');

        if (!user) {
            console.log("User not found for token:", decoded._id);
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

}

export const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isblacklisted = await blackLToken.findOne({ token: token });
    if (isblacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id ).select('-password');
        req.captain = captain;
        next(); 
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
} 