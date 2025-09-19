import { body } from "express-validator";

// register validation
export const registerValidation = [
  body("first_name")
    .notEmpty().withMessage("First name is required")
    .matches(/^[A-Za-z]{2,}$/).withMessage("First name must contain only letters and be at least 2 characters"),


  body("email")
    .notEmpty().withMessage("Email is required")
    .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/).withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage("Password must be at least 6 characters and contain letters and numbers"),

  body("phone_number")
    .notEmpty().withMessage("Phone number is required")
    .matches(/^\+91\d{10}$/).withMessage("Phone number must be valid (+91XXXXXXXXXX)"),
];

// lodin validation
export const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/).withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .matches(/^.{6,}$/).withMessage("Password must be at least 6 characters"),
];

// product validation 
export const productValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Product name is required")
    .matches(/^[A-Za-z0-9\s,]{2,20}$/).withMessage("Product name must be 2-20 chars (letters, numbers, space, comma)"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .matches(/^[A-Za-z0-9\s.,!@#&()\-]{5,200}$/).withMessage("Description must be 5-200 valid characters"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .matches(/^\d+(\.\d{1,2})?$/).withMessage("Price must be a positive number with up to 2 decimals"),

  body("stock")
    .notEmpty().withMessage("Stock is required")
    .matches(/^\d+$/).withMessage("Stock must be a non-negative integer"),

  body("category")
    .trim()
    .notEmpty().withMessage("Category is required")
    .matches(/^([A-Za-z\s]{2,30})(,\s*[A-Za-z\s]{2,30})*$/)
    .withMessage("Category must be comma-separated words (2-30 letters each)"),

  body("image")
    .trim()
    .notEmpty().withMessage("Image URL is required")
    .matches(/^(https?:\/\/[^\s]+)$/i).withMessage("Plase enter the valid url"),
];

