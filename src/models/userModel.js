import Joi from "joi";
import { Schema, model } from "mongoose";

// Address Schema
const AddressSchema = new Schema({
  state: {
    type: String,
    required: [true, "Address type is required."],
    minlength: 2,
    maxlegth:20
  },
  zip: {
    type: Number,
    required: [true, "Zip code is required."],
    minlength: 10000,
    maxlegth:999999
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  address: {
    type: String,
    required: [true, "Address is required."],
  },
});

// User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required."],
    },
    email: {
      type: String,
      required: [true, "User email is required."],
      unique: [true, "This email is already registered."],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    addresses: [AddressSchema],
  },
  { timestamps: true }
);

// Joi schema for user validation
const userValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "User name is required.",
    "any.required": "User name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "User email is required.",
    "string.email": "A valid email is required.",
    "any.required": "User email is required.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password should be at least 8 characters long.",
    "any.required": "Password is required.",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required.",
      "string.pattern.base": "Phone number must be 10 digits.",
      "any.required": "Phone number is required.",
    }),
  addresses: Joi.array().items(
    Joi.object({
      type: Joi.string().required().messages({
        "string.empty": "Address type is required.",
        "any.required": "Address type is required.",
      }),
      zip: Joi.number().required().messages({
        "number.base": "Zip code must be a number.",
        "any.required": "Zip code is required.",
      }),
      city: Joi.string().required().messages({
        "string.empty": "City is required.",
        "any.required": "City is required.",
      }),
      address: Joi.string().required().messages({
        "string.empty": "Address is required.",
        "any.required": "Address is required.",
      }),
    })
  ),
});

// Function for Joi validation
const validateUser = (data) => {
  return userValidationSchema.validate(data, { abortEarly: false });
};

const userModel = model("User", UserSchema);

export { userModel, validateUser };
