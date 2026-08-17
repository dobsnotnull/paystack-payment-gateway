import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";

dotenv.config();

console.log("Paystack key exists:", !!process.env.PAYSTACK_SECRET_KEY);


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});