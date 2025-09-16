import { body } from "express-validator";

// register validation
export const registerValidation = [
  body("first_name")
    .notEmpty().withMessage("First name is required")
    .matches(/^[A-Za-z]{2,}$/).withMessage("First name must contain only letters and be at least 2 characters"),

  body("last_name")
    .notEmpty().withMessage("Last name is required")
    .matches(/^[A-Za-z]{1,}$/).withMessage("Last name must contain only letters"),

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
    .notEmpty().withMessage("Product name is required")
    .matches(/^[A-Za-z0-9\s]{3,50}$/).withMessage("Product name must be 3-50 characters, letters/numbers only"),

  body("description")
    .notEmpty().withMessage("Description is required")
    .matches(/^.{10,500}$/).withMessage("Description must be 10-500 characters"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a valid number greater than 0"),


  body("stock")
    .notEmpty().withMessage("Stock is required")
    .matches(/^\d+$/).withMessage("Stock must be a valid integer"),

  body("category")
    .notEmpty().withMessage("Category is required")
    .matches(/^[A-Za-z\s]{3,30}$/).withMessage("Category must be 3-30 characters, letters only"),

  body("tags")
    .optional()
    .isArray().withMessage("Tags must be an array")
    .custom((tags) => tags.every(tag => /^[A-Za-z0-9\s]{2,20}$/.test(tag)))
    .withMessage("Each tag must be 2-20 characters, letters/numbers only"),

  body("imageUrl")
    .optional()
    .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i)
    .withMessage("Image URL must be a valid link to an image"),
];
