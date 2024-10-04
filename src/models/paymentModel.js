import { Schema, model } from "mongoose";
import Joi from "joi";

// Payment Schema
const PaymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID is required."],
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required."],
    },
    method: {
      type: String,
      required: [true, "Payment method is required."],
      // enum: ["Credit Card", "UPI", "Bank Transfer", "Cash"],
      // default: "Cash",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    transactionID: {
      type: String,
      required: [true, "Transaction ID is required."],
      unique:true
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
    },
  },
  { timestamps: true }
);


// Joi schema for payment validation
const paymentValidationSchema = Joi.object({
  order: Joi.string().required().messages({
    "string.empty": "Order ID is required.",
    "any.required": "Order ID is required.",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Payment amount must be a valid number.",
    "number.positive": "Payment amount must be greater than zero.",
    "any.required": "Payment amount is required.",
  }),
  method: Joi.string()
    // .valid("Credit Card", "PayPal", "Bank Transfer")
    .required()
    .messages({
      "string.empty": "Payment method is required.",
      // "any.only":"Payment method must be one of Credit Card, PayPal, or Bank Transfer.",
      "any.required": "Payment method is required.",
    }),
  status: Joi.string()
    .valid("Pending", "Completed", "Failed")
    .optional()
    .messages({
      "any.only": "Status must be one of Pending, Completed, or Failed.",
    }),
  transactionID: Joi.string().required().messages({
    "string.empty": "Transaction ID is required.",
    "any.required": "Transaction ID is required.",
  }),
  totalPrice: Joi.number().positive().required().messages({
    "number.base": "Total price must be a valid number.",
    "number.positive": "Total price must be greater than zero.",
    "any.required": "Total price is required.",
  }),
});

// Function for Joi validation
const validatePayment = (data) => {
  return paymentValidationSchema.validate(data, { abortEarly: false });
};

const paymentModel = model("Payment", PaymentSchema);

export { paymentModel, validatePayment };
