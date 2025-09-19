import express from "express";
import { body, validationResult } from "express-validator";
import Product from "../models/Product.js";

const router = express.Router();

// Validation middleware
export const productValidation = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("stock").isInt({ min: 0 }).withMessage("Stock cannot be negative"),
  body("category").notEmpty().withMessage("Category is required"),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

// ---------------- Create Product ----------------
router.post(
  "/",
  productValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, description, price, stock, category, tags, imageUrl } = req.body;

      if (!imageUrl) return res.status(400).json({ error: "Image URL is required" });

      const product = new Product({
        name,
        description,
        price,
        stock,
        category,
        tags: tags || [],
        imageUrl,
      });

      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// ---------------- Update Product ----------------
router.put(
  "/:id",
  productValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, description, price, stock, category, tags, imageUrl } = req.body;

      const updateData = {
        name,
        description,
        price,
        stock,
        category,
        tags,
        ...(imageUrl && { imageUrl }),
      };

      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!product) return res.status(404).json({ error: "Product not found" });

      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// ---------------- Get All Products ----------------
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Delete Product ----------------
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// search bar
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { tags: { $in: [regex] } }
      ];
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Get Single Product by ID ----------------
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
