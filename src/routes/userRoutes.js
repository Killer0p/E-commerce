import express from 'express'
import { createUser } from '../controllers/usercontroller.js';



const router = express.Router();

router.get('/user', (req, res) => {
  res.send('route page');
})

router.post('/user', createUser);

export default router;