import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import constant from "./config/constant.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

connectDb();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the E-commerce API",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = constant.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port 4000");
});
