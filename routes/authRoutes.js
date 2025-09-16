import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../validation/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

// Middleware for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration, login, and JWT token management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: field
 *               msg:
 *                 type: string
 *                 example: Invalid email format
 *               path:
 *                 type: string
 *                 example: email
 *               location:
 *                 type: string
 *                 example: body
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - phone_number
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Lingesh
 *               last_name:
 *                 type: string
 *                 example: MD
 *               email:
 *                 type: string
 *                 example: lingesh@example.com
 *               password:
 *                 type: string
 *                 example: Qwe123
 *               phone_number:
 *                 type: string
 *                 example: "+919876543210"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid data (Validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post("/register", registerValidation, handleValidationErrors, registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: lingesh@example.com
 *               password:
 *                 type: string
 *                 example: Qwe123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT tokens
 *       400:
 *         description: Invalid data (Validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginValidation, handleValidationErrors, loginUser);

export default router;
