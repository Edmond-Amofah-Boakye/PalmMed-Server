import mongoose, { Document, Schema, mongo } from "mongoose";
import Joi, { ValidationResult } from "joi";

const predictionSchema = new mongoose.Schema<any>({
 prediction_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prediction"
 },

 verdict: {
    type: String
 },
  
}, {
   timestamps: true
});

export const Reports = mongoose.model<any>("Reports", predictionSchema);



