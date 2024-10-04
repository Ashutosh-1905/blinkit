import { Schema, model } from "mongoose";
import Joi from "joi";

// Order Schema
const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to a user document
      required: [true, "User ID is required."],
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product", // Reference to product documents
        required: [true, "At least one product is required."],
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
    },
    address: {
      type: String,
      required: [true, "Shipping address is required."],
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Example of allowed values
      default: "Pending",
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment", // Reference to payment document
      required: [true, "Payment information is required."],
    },
    delivery: {
      type: Schema.Types.ObjectId,
      ref: "Delivery", // Reference to delivery document
      required: [true, "Delivery information is required."],
    },
  },
  { timestamps: true }
);

// Joi schema for order validation
const orderValidationSchema = Joi.object({
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
    "number.positive": "Total price must be greater than zero.",
    "any.required": "Total price is required.",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Shipping address is required.",
    "any.required": "Shipping address is required.",
  }),
  status: Joi.string()
    .valid("Pending", "Shipped", "Delivered", "Cancelled")
    .optional()
    .messages({
      "any.only":
        "Status must be one of Pending, Shipped, Delivered, or Cancelled.",
    }),
  payment: Joi.string().required().messages({
    "string.empty": "Payment ID is required.",
    "any.required": "Payment information is required.",
  }),
  delivery: Joi.string().required().messages({
    "string.empty": "Delivery ID is required.",
    "any.required": "Delivery information is required.",
  }),
});

// Function for Joi validation
const validateOrder = (data) => {
  return orderValidationSchema.validate(data, { abortEarly: false });
};

const orderModel = model("Order", OrderSchema);

export { orderModel, validateOrder };
