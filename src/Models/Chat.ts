import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "user",
    },
    email: {
        type: String,
        required: true,
    }
},  { timestamps: true });

export const Chat = mongoose.model("Chat", chatSchema);




