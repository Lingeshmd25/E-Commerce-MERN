import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// --- CORS setup ---
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// --- Swagger setup ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for e-commerce project",
    },
    servers: [
      { url: "http://localhost:5000", description: "Local Dev" },
      { url: "http://13.228.225.19:5000", description: "Deployed Server 1" },
      { url: "http://18.142.128.26:5000", description: "Deployed Server 2" },
      { url: "http://54.254.162.138:5000", description: "Deployed Server 3" },
      { url: "https://e-commerce-bgbt.onrender.com", description: "Render Deployment" },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// --- Start server ---
const PORT = process.env.LOCAL_PORT || process.env.REMOTE_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
