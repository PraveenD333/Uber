import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({ 
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
        maxLength: [15, "Phone number must be at most 15 characters"]
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 characters"]
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate must be at least 3 characters"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["Car", "Motorcycle", "Auto"]
        }
    },
    location: {
        ltd: {type: Number,},
        lng: {type: Number,}
     },

});

// Methods
 

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
}
captainSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = model("captain", captainSchema);
export default captainModel;