import express from 'express'
import { createUser } from '../controllers/usercontroller.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';



const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  const user = req.user
  // console.log("I am decoded from route",user)
  res.send('route page');
})

router.post('/user', createUser);

export default router;