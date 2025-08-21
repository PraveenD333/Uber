import captainModel from "../models/captain.model.js";


export const createCaptain = async ({ firstname, lastname, email, password,phone,color,plate,capacity,vehicleType}) => {  

    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType || !phone) {
        throw new Error("All fields are required");
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        phone,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}