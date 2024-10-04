import Joi from "joi";
import { Schema, model } from "mongoose";
// Product Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
    },
    stock: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "No description provided.",
    },
    image: {
      type: String,
      default: "No image available.", 
    },
  },
  { timestamps: true }
);

// Joi schema for product validation
const productValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Product name is required.",
    "any.required": "Product name is required.",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Product price must be a valid number.",
    "number.positive": "Product price must be greater than zero.",
    "any.required": "Product price is required.",
  }),
  stock: Joi.boolean().messages({
    "boolean.base": "Stock must be a boolean value (true or false).",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Product description should be a valid string.",
  }),
  image: Joi.string().messages({
    "string.uri": "Image must be a valid URI.",
  }),
});

// Function for Joi validation
const validateProduct = (data) => {
  return productValidationSchema.validate(data, { abortEarly: false });
};

const productModel = model("Product", ProductSchema);

export { productModel, validateProduct };
