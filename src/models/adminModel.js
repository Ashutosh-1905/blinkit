import { Schema, model } from "mongoose";
import Joi from "joi";

// Admin Schema
const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required."],
    },
    email: {
      type: String,
      required: [true, "User email is required."],
      unique: [true, "Only valid and unique email address is required."],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

// Joi schema for admin validation
const adminValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "User name is required.",
    "any.required": "User name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "User email is required.",
    "string.email": "Please provide a valid email address.",
    "any.required": "User email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
  role: Joi.string().optional().valid("Admin", "SuperAdmin").messages({
    "any.only": "Role must be either Admin or SuperAdmin.",
  }),
});

// Function for Joi validation
const validateAdmin = (data) => {
  return adminValidationSchema.validate(data, { abortEarly: false });
};

const adminModel = model("Admin", AdminSchema);

export { adminModel, validateAdmin };
