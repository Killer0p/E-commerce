import express from 'express';  
import userRoutes from './routes/userRoutes.js'; // Importing user routes
import { configDotenv } from 'dotenv';
import connectDb from './config/db.js';

const app = express ();

configDotenv();

connectDb();

app.use (express.json ()); // Middleware to parse JSON bodies
app.use (express.urlencoded ({ extended: true })); // Middleware to parse URL-encoded bodies

app.get ('/', (req, res) => {
  res.status (200).json({
    message: 'Welcome to the E-commerce API',
    
  }

  )
});

app.use('/api', userRoutes)
app.use('/api/product', ()=> {})







const PORT = process.env.PORT
app.listen (PORT,() => {
  console.log('Server is running on port 4000')
});

