import order from "../models/Order.js";


const createOrder = async (data) => {
  return await order.create(data);
};


const getOrderById = (id)=>{
  return order.findById(id)
}

const getOrderByUserId = (userId)=>{
  return order.find({ user: userId });
}

const updateOrderStatus =async (id,status)=>{

   return await  order.findByIdAndUpdate(id,{
    orderStatus : status
   },{new:true})
}

const updatePaymentStatus = async(id,status)=>{
   return await order.findByIdAndUpdate(id,{
    paymentStatus : status
   },{new:true})
}

export default {
  createOrder,getOrderById,getOrderByUserId,updatePaymentStatus,updateOrderStatus
}