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
  origin: "*", // For testing; in production, restrict domains
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// --- Swagger servers setup ---
const servers = [
  { url: `http://localhost:${process.env.LOCAL_PORT || 5000}`, description: "Local Development Server" }
];

// Add Render deployment server if available
if (process.env.RENDER_EXTERNAL_HOSTNAME) {
  servers.push({
    url: `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`,
    description: "Render Production Server"
  });
}

// --- Swagger setup ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for E-Commerce project"
    },
    servers: servers
  },
  apis: ["./routes/*.js"], // Path to your route files with Swagger comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// --- Start server ---
const PORT = process.env.PORT || process.env.LOCAL_PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.RENDER_EXTERNAL_HOSTNAME) {
    console.log(`Render URL: https://${process.env.RENDER_EXTERNAL_HOSTNAME}`);
  }
});
