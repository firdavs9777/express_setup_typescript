import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos'
import dotenv from 'dotenv';
import connectDB from './config/db';
import { products, ProductType } from './data/products';
import Product from './models/product';
import ProductRouter from './routes/products';
const app = express(); 
const cors = require('cors');
import errorHandler from './middleware/error';

// Dotenv implemented and imported
dotenv.config();
// Connect to Database 
connectDB();
// const port:number = parseInt(process.env.PORT || '5002', 10);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/todos', todoRoutes);
app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
})
app.use('/api/v1/products', ProductRouter);
app.use(errorHandler);

app.listen(5004, ()=> console.log(`Server is running on port ${5004}`));