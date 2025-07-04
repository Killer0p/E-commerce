import { get } from "mongoose";
import Product from "../models/Product.js";

const createProduct = async (data) => {
  return await Product.create(data);
};

const getAllProduct = async () => {
  return await Product.find();
};

const getProductById = async (Id) => {
  return await Product.findById(Id);
};

const deleteProductById = async (Id) => {
  return await Product.findByIdAndDelete(Id);
};
const updateProductById = async (Id, data) => {

  return await Product.findByIdAndUpdate(Id, data, { new: true });
};
export default {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
