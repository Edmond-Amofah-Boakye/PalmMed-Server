import mongoose, { Document } from "mongoose";


const messageV2Schema = new mongoose.Schema({
    chat_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Chatv2"
    },
    propmt: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },

    ai_response: {
        type: String,
    },

    message:{
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
    
},  { timestamps: true });

export const MessageV2 = mongoose.model("MessageV2", messageV2Schema);




