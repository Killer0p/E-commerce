import express from 'express';
import { createProduct } from '../controllers/productController.js'; 
import { getAllProduct, getProductById, deleteProductById, updateProductById } from '../controllers/productController.js'; 
import { isAdmin } from '../middleware/isAdmin.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


const router = express.Router ();

router.post ('/createProduct', isLoggedIn,isAdmin,createProduct)

router.get ('/getAllProduct', getAllProduct);

router.get ('/getProductById/:id', getProductById);

router.delete ('/deleteProductById/:id', isLoggedIn,isAdmin,deleteProductById);

router.put ('/updateProductById/:id', isLoggedIn,isAdmin,updateProductById,);

export default router;