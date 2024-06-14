import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import ProductRouter from "./routes/products";
const app = express();
const cors = require("cors");
import errorHandler from "./middleware/error";
import UserRouter from "./routes/userRoutes";

import OrderRouter from "./routes/orderRoutes";
const cookieParser = require('cookie-parser');



출처: https://inpa.tistory.com/entry/EXPRESS-📚-bodyParser-cookieParser-미들웨어 [Inpa Dev 👨‍💻:티스토리]
// Dotenv implemented and imported
dotenv.config();
// Connect to Database
connectDB();
// const port:number = parseInt(process.env.PORT || '5002', 10);
app.use(express.json());

const corsOptions = {
  origin: true, // Change this to the origin(s) you want to allow.
  credentials: true, // Indicates that cookies and credentials should be included.
};

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
// Cookie Parser Middleware
app.use(cookieParser());
// app.use('/todos', todoRoutes);



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/orders", OrderRouter);
app.use(errorHandler);

app.listen(5004, () => console.log(`Server is running on port ${5004}`));
