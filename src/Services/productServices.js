import { get } from "mongoose";
import Product from "../models/Product.js";


const createProduct = async (data) => {
  return await Product.create(data);

  
};

const getAllProduct = async(query = {}) =>{

    const filters = {};
    if (query.brand) filters.brand = {$in:query.brand.split(',')}
    if (query.uses) filters.use = {$in:query.uses.split(',')}

    if(query.ram) {filters.ram={$in:query.ram.split(',').map(n=>parseInt(n))}}
    if(query.rom) {filters.rom={$in:query.rom.split(',').map(r=>parseInt(r))}}
    if(query.gen) {filters.gen={$in:query.gen.split(',').map(g=>parseInt(g))}}
    if(query.product) {filters.productName={$regex:query.product, $options:"i"}} 
  



  const sort = JSON.parse(query.sort || '{}');
  console.log(filters)





  return await Product.find(filters).sort(sort)
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
