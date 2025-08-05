import orderService from "../Services/orderService.js";
import constant from "../config/constant.js";
import axios from "axios";

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = req.body;
    order.user = userId;
    console.log(order)

    const totalAmount = order.totalAmount;
    if (order.paymentMethod === "KHALTI") {


      const options = {
        "return_url": "http://localhost:5173/dashboard",
        "website_url": "http://localhost:5173/",
        "amount": totalAmount * 100,
        "purchase_order_id": `${Date.now()}`,
        "purchase_order_name": `Order- ${Date.now()}`,
      };
      const result = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        options ,
        {
          headers: {
            "Authorization": `Key ${constant.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          }
        })
        if(result.data.pidx){
          order.pidx = result.data.pidx
          const khaltiResult = await orderService.createOrder(order)
          khaltiResult.paymentUrl = result.data.payment_Url
          console.log(result.data);
          return res.status(200).json({data:khaltiResult,payment_url:result.data.payment_url});
        }else{
          throw new Error ("Khalti payment failed to initaite")
        }
     
    }
    const data = await orderService.createOrder(order);
    res.status(201).json({
      message: "Order created successfully",
      order: data,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: "Error to create Order" });
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await orderService.getOrderByUserId(userId);
    res.status(200).json({
      message: "User's Order Fetchec successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: "Error to get Order" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await orderService.getOrderById(id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: "error to fetch the current order",
      error: error.message,
    });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const status = req.body.paymentStatus;
    const id = req.params.id;
    const data = await orderService.updatePaymentStatus(id, status);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: "Failed  to  update payment status",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.orderStatus;
    const data = await orderService.updateOrderStatus(orderId, status);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateKhaltiPayment = async (req, res) => {
  try {
    const { pidx, totalAmount } = req.body;

    if (!pidx || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userId =  req.user.id
    await updateKhaltiPayment(pidx, totalAmount, userId);
    return res.status(200).json({ message: "Payment updated successfully" });
  } catch (error) {
    console.error("Khalti Payment Update Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export {
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  updateKhaltiPayment
};
