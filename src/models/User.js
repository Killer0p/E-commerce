



import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  userName: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String, 
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  
  phone:{
    type: Number,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CUSTOMER'],
    default: 'CUSTOMER',  
  }


},{
  timestamps: true,
  
})




const User = mongoose.model('user', userSchema)

export default User;