import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import ProductRouter from "./routes/products";
const app = express();
const cors = require("cors");
import errorHandler from "./middleware/error";
import UserRouter from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import OrderRouter from "./routes/orderRoutes";
// Dotenv implemented and imported
dotenv.config();
// Connect to Database
connectDB();
// const port:number = parseInt(process.env.PORT || '5002', 10);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/todos', todoRoutes);
app.use(cors());
// Cookie Parser Middleware
app.use(cookieParser());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/orders", OrderRouter);
app.use(errorHandler);

app.listen(5004, () => console.log(`Server is running on port ${5004}`));
