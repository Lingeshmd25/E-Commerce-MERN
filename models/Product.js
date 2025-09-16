const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: String,
  tags: [String],
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", product);
