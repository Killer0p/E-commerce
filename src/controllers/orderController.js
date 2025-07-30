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

export {createOrder};
