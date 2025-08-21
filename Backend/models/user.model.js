import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters"]
        },
        lastname: {
            type: String,
            required: true,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be at least 5 characters"],
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be at least 10 characters"],
        maxLength: [15, "Phone number must be at most 15 characters"],
    },
    socketId: {
        type: String
    },
})

// Methods

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'2h'});
    return token;
}
// Compare password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// Hash password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = model("user", userSchema);

export default userModel; 