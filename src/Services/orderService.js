import order from "../models/Order.js";



const createOrder = async (data) => {
  return await order.create(data);
};


export default {
  createOrder
}