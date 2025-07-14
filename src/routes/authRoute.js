import express from "express";
import {
  forgotPassword,
  login,
  register, verifyOtp
} from "../controllers/authController.js";
import { sendMail } from "../utils/sendMail.js";
import { generateOtp } from "../utils/generateOtp.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcrypt"
import User from "../models/User.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword)
router.post("/verify-otp", verifyOtp)

router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Email and Password required");

    const doesUserExist = await User.findOne({ email });

    if (!doesUserExist){
      throw new Error("User not registered");
    }
   
    if (!doesUserExist.canChangePassword){
      throw new Error ("Please verify OTP first!")
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const data = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword, canChangePassword: false },
      { new: true }
    );
    res.status(200).json({
      message: "password changed successfullly",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

export default router;
