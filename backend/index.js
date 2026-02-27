
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import createProd from "./router/pRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/products",createProd);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});