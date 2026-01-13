import express from "express";
import { DBConnect } from "./config/db.config.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

await DBConnect();

/*  {Auth Routes}  */
import authRoutes from "./routes/auth.route.js";
app.use("/api", authRoutes);

import userRoutes from "./routes/user.route.js";
app.use("/api/user", userRoutes);

import productRoutes from "./routes/product.route.js";
app.use("/api/products", productRoutes);

import adminProductRoutes from "./routes/adminProduct.route.js";
app.use("/api/admin/products", adminProductRoutes);

import reviewRoutes from "./routes/review.route.js";
app.use("/api/reviews", reviewRoutes);

import cartRoutes from "./routes/cart.route.js";
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
