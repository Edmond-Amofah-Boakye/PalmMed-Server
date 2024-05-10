import mongoose, { Document, Schema, mongo } from "mongoose";
import Joi, { ValidationResult } from "joi";

const predictionSchema = new mongoose.Schema<any>({
  age: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  sex: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  cp: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  trestbps: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  chol: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },
  
  fbs: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  restecg: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  thalach: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  exang: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  oldpeak: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  slope: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  ca: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  thal: {
    type: Number,
    minlength: 0,
    maxlength: 256,
    required: true,
  },

  reports: [],

  prediction: {
    type: Schema.Types.Mixed,
    required: false
  },

  doctor_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
  ,

  user_id: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    ai_assisted_text: {
      type: String,
    },
  
});

export const Prediction = mongoose.model<any>("Prediction", predictionSchema);

// export const validateUserRegistration = (
//   user: Doctorinterface
// ): ValidationResult => {
//   const schema = Joi.object({
//     firstname: Joi.string().min(3).max(256).required(),
//     lastname: Joi.string().min(3).max(256).required(),
//     email: Joi.string().email().max(256).required(),
//     imageUrl: Joi.string().max(1024),
//     password: Joi.string().min(7).max(256).required(),
//   });

//   return schema.validate(user);
// };


