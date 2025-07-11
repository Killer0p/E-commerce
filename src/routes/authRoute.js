
import express from 'express';
import { forgotPassword, login, register } from '../controllers/authController.js';





const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.get('/profile', verifyToken, getUserProfile);
router.post('/forgotPassword', forgotPassword);



export default router;