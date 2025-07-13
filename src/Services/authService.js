import bcrypt from "bcrypt";
import User from "../models/User.js";
import { hashPassword } from "../utils/utility.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendMail } from "../utils/sendMail.js";
import Otp from "../models/Otp.js";

const register = async (data) => {
  const hashedPassword = hashPassword(data.password);
  // console.log(hashedPassword)

  const email = data.email;
  const userExist = await User.find({ email });

  if (!userExist) {
    new Error("User already exists");
  }
  return await User.create({
    userName: data.userName,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });
};

const login = async (data) => {
  const doEmailExist = await User.find({ email: data.email });

  if (!doEmailExist.length > 0) {
    throw new Error("User do1es not exist");
  }

  const dbPassword = doEmailExist[0].password;
  const isPasswordMatched = bcrypt.compareSync(data.password, dbPassword);

  if (isPasswordMatched) {
    return doEmailExist[0];
  } else {
    throw new Error("Password does not match");
  }
};

const forgotPassword = async (data) => {
  const userRegistered = await User.findOne({ email: data.email });

  if (!userRegistered) {
    throw new Error("Invalid Request");
  }

  const otp = generateOtp();

  const newOtp = await Otp.create({
    enail: data.email,
    otp: otp,
  });

  sendMail(data.email, otp);
  respond.send(newOtp);
  return;
};
export default { register, login, forgotPassword };
