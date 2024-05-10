import mongoose, { Document } from "mongoose";


const messageSchema = new mongoose.Schema({
    chat_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "chat"
    },
    message: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
        enum: ["AI", "User"]
    }
},  { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);




