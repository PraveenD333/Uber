import userModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, password, phone }) => {
    if (!firstname || !email || !password || !phone) {
        throw new Error("All fields are required");
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        phone
    });

    return user;
}