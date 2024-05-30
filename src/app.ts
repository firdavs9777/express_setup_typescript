import express, { Request, Response, NextFunction } from 'express';
// import
import todoRoutes from './routes/todos'
import { json } from 'body-parser';
import dotenv from 'dotenv';
import { products } from '../data/products';

const port = 5001;
dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);

console.log('test')

const app = express();
app.use(json());
app.use('/todos', todoRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
})
app.get('/', (req: Request, res: Response) => {
  res.send('Api is running')
})
app.get('/api/v1/products', (req: Request, res: Response) => {
  res.json(products)
})
app.listen(port, ()=> console.log(`Server is running on port ${port}`));