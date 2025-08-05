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

const updateKhaltiPayment = async(pidx,totalAmount,userId,)=>{
  const order = await order.findOne({pidx});
  if(!order){throw new Error ("No order found")}
  if(order.totalAmount !== totalAmount) {throw new Error("Some error occured warning!!")}
  if(order.user !== userId) {throw new Error("Invalid Operation")}

  const result = await order.findOneAndUpdate({pidx},{paymentStatus:"COMPLETED"})
} 

export default {
  createOrder,getOrderById,getOrderByUserId,updatePaymentStatus,updateOrderStatus,updateKhaltiPayment
}