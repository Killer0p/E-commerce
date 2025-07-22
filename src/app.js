import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import constant from "./config/constant.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.cookie("name", "name", {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
  });
  res.send("Hello");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the E-commerce API",
  });
});

app.get("/api/clear-cookie", (req, res) => {
  res.clearCookie("name", {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
  });
 res.status(200).send("cookie cleared");
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = constant.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:4000");
});
