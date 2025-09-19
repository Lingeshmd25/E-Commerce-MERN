import Product from "../models/Product.js";
import upload from "../middleware/upload.js";



//  Get Single Product by Name
export const getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, tags, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      tags,
      imageUrl, 
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, tags, imageUrl } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category, tags, imageUrl },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//  Delete Product by Name (Admin only)
export const deleteProductByName = async (req, res) => {
  try {
    const productName = req.params.name.trim();
    const product = await Product.findOneAndDelete({
      name: { $regex: `^${productName}$`, $options: "i" },
    });
    if (!product) {
      // Product not found
      return res.status(404).json({ message: "Product not found" });
    }
    // Product deleted successfully
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products without filter or pagination
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Get All Products (Customer & Admin) with search, filter, pagination
export const getProducts = async (req, res) => {
  try {
    const { q } = req.query; // single query parameter
    const filter = {};

    if (q) {
      const regex = new RegExp(q.trim(), "i"); // case-insensitive
      filter.$or = [
        { name: regex },       // match name
        { tags: { $in: [regex] } } // match tags array
      ];
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// productController.js
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
