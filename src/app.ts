import path from "path";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import ProductRouter from "./routes/products";
const app = express();
const cors = require("cors");
import errorHandler from "./middleware/error";
import UserRouter from "./routes/userRoutes";
import UploadRouter from './routes/uploadRoutes';
import OrderRouter from "./routes/orderRoutes";
const cookieParser = require('cookie-parser');


// 출처:
// https://inpa.tistory.com/entry/EXPRESS-📚-bodyParser-cookieParser-미들웨어 [Inpa Dev 👨‍💻:티스토리]
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
// paypal url
app.get('/api/v1/config/paypal', (req, res) => res.send({cliendId: process.env.PAYPAL_CLIENT_ID}))

const UPLOAD_DIR = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api/v1/upload', UploadRouter);

// app.use(cors({
//     origin: 'http://localhost:3000' // Allow requests from this origin
// }));
app.use(errorHandler);
app.listen(5005, () => console.log(`Server is running on port ${5005}`));
