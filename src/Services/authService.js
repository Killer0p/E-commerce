import bcrypt from 'bcrypt';
import User from '../models/User.js';


const register = async (data)=> {
  const hashedPassword = bcrypt.hashSync(data.password, 10)
  // console.log(hashedPassword)

  const email = data.email
  const userExist  = await User.find({email}) 

  if(!userExist){
    new Error ('User already exists')
  }
   return await User.create({
    userName: data.userName,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,

    
  })




}
export default {register}