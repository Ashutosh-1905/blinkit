import { Schema, model } from "mongoose";
import Joi from "joi";

// Category Schema
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
    },
  },
  { timestamps: true }
);



// Joi schema for category validation
const categoryValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Category name is required.",
    "any.required": "Category name is required.",
  }),
});

// Function for Joi validation
const validateCategory = (data) => {
  return categoryValidationSchema.validate(data, { abortEarly: false });
};

const categoryModel = model("Category", CategorySchema);

export { categoryModel, validateCategory };
