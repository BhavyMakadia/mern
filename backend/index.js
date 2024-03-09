import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });


  const app = express();
  app.use(cookieParser());

  const port = process.env.PORT || 3000; 
app.use(express.json());
app.use(cookieParser());

app.use(cors());

  app.listen(port, () => {
    console.log(`Our Server is running on port ${port}`);
  });

  
app.use('/backend/user', userRouter);
app.use('/backend/auth', authRouter);
app.use('/backend/listing', listingRouter);

app.use((err,req,res,next)=>{
  const statusCode =err.statusCode || 500;
  const message=err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});