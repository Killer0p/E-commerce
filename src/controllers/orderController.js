import orderService from "../Services/orderService.js";


const createOrder = async (req, res) => {
  try {

    const userId = req.user.id
    const order = req.body;
    order.user = userId;
    const data = await orderService.createOrder(order);
    res.status(201).json({
      message: "Order created successfully",
      order: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json ({error:error.message,message: "Error to create Order"});
  }
}

const getOrderByUserId = async (req, res) => {
  try {
      const userId = req.user.id
      const data = await orderService.getOrderByUserId(userId)
      res.status(200).json({
        message : "User's Order Fetchec successfully",
        data
      })
  } catch (error) {
    console.log(error.message);
    res.status(400).json ({error:error.message,message: "Error to get Order"});
    
  }
}

const getOrderById  = async(req,res)=>{
  try {
      const id =  req.params.id;
    const data = await orderService.getOrderById(id)
    res.status(200).json({data})
  } catch (error) {
    res.status(400).json({
      message : "error to fetch the current order",
    error : error.message
    })
  }
}

const updatePaymentStatus = async (req,res)=>{
  try {
    const  status = req.body.paymentStatus 
    const id = req.params.id
    const data = await orderService.updatePaymentStatus(id,status)
    res.status(200).json({data})
  } catch (error) {
    res.status(400).json({
      message: "Failed  to  update payment status",
      error : error.message
    })
  }
}

const updateOrderStatus = async(req,res)=>{
  try {
      const orderId = req.params.id
      const status = req.body.orderStatus
      const data  = await  orderService.updateOrderStatus(orderId,status)
  } catch (error) {
    res.status(400).json({
      error : error.message
    })
  }
}

export {createOrder,getOrderById,getOrderByUserId,updateOrderStatus,updatePaymentStatus};
