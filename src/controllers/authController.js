
import authService from "../Services/authService.js"
import jwt from "jsonwebtoken"

const register = async(req, res)=>{
    
    try{
        const {email, phone, password, confirmPassword, userName} = req.body
    
        if(!password || !email || !phone || !confirmPassword || !userName){
            return res.status(400).json({message:"user credentials missing"})
        }
    
        if (password!==confirmPassword){return res.status(400).json({message:"password donot match"})}
    
        const data = await authService.register({email, phone, password, userName})
        res.status(200).json({
            message: "user registered successful",
            data
        })
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"error occured to register", error:error.message})
    }
    
}

const login = async(req, res)=>{
try {
      const {email, password} = req.body

  if(!email || !password){
    // return res.status(400).json({message:"user credentials missing"})
    throw new Error ('user credentials missing');
  }
  const data = await authService.login({email, password})
  const payload = {
    id: data._id,
    role: data.role,
    phone: data.phone,
    email: data.email
  }
  const token = jwt.sign(payload,"secretkey")
  res.cookie('authToken',token)
  res.status(200).json({
    message : "login successful",
    data,
    token
  })

  
  res.status(200).json({
      message: "user logged in successful",
      data
  })

} catch (error) {
  console.log(error.message)
  res.status(400).json({message:"error occurred during login", error: error.message})
}
}

export{register, login}