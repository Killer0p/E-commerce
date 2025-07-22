import mongoose from 'mongoose';
import { adminSeeder } from '../seeders/adminSeeders.js';
import constant from './constant.js';


const connectDb = async () => {
  try{
    await mongoose.connect(constant.MONGO_URI)
    console.log('Database connected successfully');

    adminSeeder();

  }  catch (error) {
    console.error('Database connection failed:', error);

  }   
}

export default connectDb;