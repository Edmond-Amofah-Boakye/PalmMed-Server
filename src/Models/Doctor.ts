import mongoose, { Document, mongo } from "mongoose";
import Joi, { ValidationResult } from "joi";
import { Doctor as Doctorinterface, ROLE } from "../types";
import crypto from "crypto";

const doctorSchema = new mongoose.Schema<Doctorinterface>({
  firstname: {
    type: String,
    minlength: 3,
    maxlength: 256,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    minlength: 3,
    maxlength: 256,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 256,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    minlength: 3,
    maxlength: 1024,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },

  role:{
    type: String,
    default: ROLE.doctor
  },

  reports: [],

  user_id: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  ]
});

export const Doctor = mongoose.model<Doctorinterface>("Doctor", doctorSchema);

export const validateUserRegistration = (
  user: Doctorinterface
): ValidationResult => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(256).required(),
    lastname: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().max(256).required(),
    imageUrl: Joi.string().max(1024),
    password: Joi.string().min(7).max(256).required(),
  });

  return schema.validate(user);
};


