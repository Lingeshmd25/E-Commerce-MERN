import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from "cors";

const app = express();
app.use(cors({
  origin: "*", // testing ku allow all
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Optional: print spec to verify
console.log(JSON.stringify(swaggerSpec.servers, null, 2));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(5000, () => console.log("Server running on port 5000"));
