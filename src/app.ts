import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos'
import { json } from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { products, ProductType } from './data/products';
const app = express(); 
const cors = require('cors');
// Dotenv implemented and imported
dotenv.config();
// Connect to Database 
connectDB();
// const port:number = parseInt(process.env.PORT || '5002', 10);
app.use(json());
app.use('/todos', todoRoutes);
app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
})
app.get('/', (req: Request, res: Response) => {
  res.send('Api is running')
})
app.get('/api/v1/products', (req: Request, res: Response) => {
  res.json(products)
})
app.get('/api/v1/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find((p:ProductType ) => p.id === id);
  res.json(product)
})
app.listen(5002, ()=> console.log(`Server is running on port ${5002}`));