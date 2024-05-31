import express, { Request, Response, NextFunction } from 'express';
// import
import todoRoutes from './routes/todos'
import { json } from 'body-parser';
<<<<<<< HEAD
import dotenv from 'dotenv';
import { products } from '../data/products';
=======
>>>>>>> parent of 1ac9e22 (new changes)

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
app.listen(3000);
