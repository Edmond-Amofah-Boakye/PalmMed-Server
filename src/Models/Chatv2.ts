import mongoose from "mongoose";


const chatV2Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "user",
    },
    chat_message: [{
        type: mongoose.Schema.Types.Mixed,
        ref: "MessageV2"
    }]
},  { timestamps: true });

export const ChatV2 = mongoose.model("Chatv2", chatV2Schema);




