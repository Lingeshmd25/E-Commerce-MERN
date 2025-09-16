import Product from "../models/Product.js";

// 👉 Create Product (Admin only)
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 👉 Get All Products (Customer & Admin) with search, filter, pagination
export const getProducts = async (req, res) => {
  try {
    const { name, category, tags, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(",") };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👉 Get Single Product by Name
export const getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👉 Update Product by Name (Admin only)
export const updateProductByName = async (req, res) => {
  try {
    const productName = req.params.name.trim();
    const product = await Product.findOneAndUpdate(
      { name: { $regex: `^${productName}$`, $options: "i" } }, // case-insensitive match
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// 👉 Delete Product by Name (Admin only)
// Delete Product by Name (Admin only)
export const deleteProductByName = async (req, res) => {
  try {
    const productName = req.params.name.trim();
    const product = await Product.findOneAndDelete({ name: { $regex: `^${productName}$`, $options: "i" } });
    
    if (!product) return res.status(404).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products with search, filter, pagination
export const getProduct = async (req, res) => {
  try {
    const { name, category, tags, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(",") };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};