import express, { Request, Response, NextFunction } from 'express';
// import
import todoRoutes from './routes/todos'
import { json } from 'body-parser';
const port = 5001;


const app = express();
app.use(json());
app.use('/todos', todoRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
})
app.get('/', (req: Request, res: Response) => {
  res.send('Api is running')
})
app.listen(port, ()=> console.log(`Server is running on port ${port}`));