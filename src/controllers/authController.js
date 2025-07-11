import { createToken } from "../helpers/token.js";
import authService from "../Services/authService.js";


const register = async (req, res) => {
  try {
    const { email, phone, password, confirmPassword, userName } = req.body;

    if (!password || !email || !phone || !confirmPassword || !userName) {
      return res.status(400).json({ message: "user credentials missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password donot match" });
    }

    const data = await authService.register({
      email,
      phone,
      password,
      userName,
    });
    res.status(200).json({
      message: "user registered successful",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "error occured to register", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).json({message:"user credentials missing"})
      throw new Error("user credentials missing");
    }
    const data = await authService.login({ email, password });
    const payload = {
      id: data._id,
      role: data.role,
      phone: data.phone,
      email: data.email,
    };
    const token = createToken(payload);
    res.cookie("authToken", token);
    res.status(200).json({
      message: "login successful",
      data,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "error occurred during login", error: error.message });
  }
};

const forgotPassword = async (req, res) => {

try {
  const { email } = req.body;
  if (!email) {
    throw new Error("Email is required");
  }

  const data = await authService.forgotPassword({ email });

  res.status(200).json({ message: "otp send successfully" });
} catch (error) {
  console.log(error.message);
  res.status(400).send(error.message);
}};

export { register, login, forgotPassword };
