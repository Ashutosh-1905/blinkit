import { Schema, model } from "mongoose";
import Joi from "joi";

// Delivery Schema
const DeliverySchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order", // Reference to an order document
      required: [true, "Order ID is required."],
    },
    deliveryBoy: {
      type: String,
      required: [true, "Delivery boy name is required."],
    },
    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    trackingUrl: {
      type: String,
      default: "No tracking available", 
    },
    estimatedDeliveryTime: {
      type: Number,
      required: [true, "Estimated delivery time is required."],
    },
  },
  { timestamps: true }
);

// Joi schema for delivery validation
const deliveryValidationSchema = Joi.object({
  order: Joi.string().required().messages({
    "string.empty": "Order ID is required.",
    "any.required": "Order ID is required.",
  }),
  deliveryBoy: Joi.string().required().messages({
    "string.empty": "Delivery boy name is required.",
    "any.required": "Delivery boy name is required.",
  }),
  status: Joi.string()
    .valid("Pending", "In Transit", "Delivered", "Cancelled")
    .optional()
    .messages({
      "any.only":
        "Status must be one of Pending, In Transit, Delivered, or Cancelled.",
    }),
  trackingUrl: Joi.string().optional().uri().messages({
    "string.uri": "Tracking URL must be a valid URI.",
  }),
  estimatedDeliveryTime: Joi.number().positive().required().messages({
    "number.base": "Estimated delivery time must be a valid number.",
    "number.positive": "Estimated delivery time must be greater than zero.",
    "any.required": "Estimated delivery time is required.",
  }),
});

// Function for Joi validation
const validateDelivery = (data) => {
  return deliveryValidationSchema.validate(data, { abortEarly: false });
};

const deliveryModel = model("Delivery", DeliverySchema);

export { deliveryModel, validateDelivery };
