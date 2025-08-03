import express from 'express';
import {isLoggedIn} from '../middleware/isLoggedIn.js';
import {createOrder,getOrderById,getOrderByUserId,updateOrderStatus,updatePaymentStatus } from '../controllers/orderController.js';
import { isAdmin } from '../middleware/isAdmin.js';



const router = express.Router ();

router.post ('/createOrder',isLoggedIn,createOrder)
router.get("/getOrderById/:id",getOrderById)
router.get("/getOrderByUser",getOrderByUserId)
router.post("/updateOrderStatus/:id",isLoggedIn,isAdmin,updateOrderStatus)
router.post("updatePaymentStatus/:id",isLoggedIn,isAdmin,updatePaymentStatus)


export default router;