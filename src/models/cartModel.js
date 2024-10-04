import { Schema, model } from "mongoose";
import Joi from "joi";

// Cart Schema
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "At least one product is required."],
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
      min: [0, "Total price cannot be negative."], 
    },
  },
  { timestamps: true }
);

// Joi schema for cart validation
const cartValidationSchema = Joi.object({
  user: Joi.string().required().messages({
    "string.empty": "User ID is required.",
    "any.required": "User ID is required.",
  }),
  products: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one product is required.",
      "string.empty": "Product ID is required.",
      "any.required": "Products are required.",
    }),
  totalPrice: Joi.number().positive().required().messages({
    "number.base": "Total price must be a valid number.",
    "number.positive": "Total price must be greater than or equal to zero.",
    "any.required": "Total price is required.",
  }),
});

// Function for Joi validation
const validateCart = (data) => {
  return cartValidationSchema.validate(data, { abortEarly: false });
};

const cartModel = model("Cart", CartSchema);

export { cartModel, validateCart};
