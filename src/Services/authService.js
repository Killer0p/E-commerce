import bcrypt from 'bcrypt';
import User from '../models/User.js';
import {hashPassword} from '../utils/utility.js'


const register = async (data)=> {
  const hashedPassword = hashPassword(data.password)
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

const login = async (data) => {
  
 const doEmailExist = await User.find({email: data.email}) 

 if (!doEmailExist.length > 0){
  throw new Error('User do1es not exist')
 }

  const dbPassword = doEmailExist[0].password
  const isPasswordMatched = bcrypt.compareSync(data.password, dbPassword)

  if (isPasswordMatched) {
    return doEmailExist[0]
  }else {
    throw new Error ('Password does not match')
  }

}










export default {register, login}