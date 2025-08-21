import { model, Schema } from "mongoose";

const blacklistTokenSchema = new Schema({
    token: {    
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24 * 60 * 60 // 24 hours in seconds
    },
});

const blackLToken= model("BlacklistToken", blacklistTokenSchema);
export default blackLToken;