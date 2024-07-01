"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
const cors = require("cors");
const error_1 = __importDefault(require("./middleware/error"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const cookieParser = require('cookie-parser');
// 출처:
// https://inpa.tistory.com/entry/EXPRESS-📚-bodyParser-cookieParser-미들웨어 [Inpa Dev 👨‍💻:티스토리]
// Dotenv implemented and imported
dotenv_1.default.config();
// Connect to Database
(0, db_1.default)();
// const port:number = parseInt(process.env.PORT || '5002', 10);
app.use(express_1.default.json());
const corsOptions = {
    origin: true, // Change this to the origin(s) you want to allow.
    credentials: true, // Indicates that cookies and credentials should be included.
};
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// Cookie Parser Middleware
app.use(cookieParser());
// app.use('/todos', todoRoutes);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.use("/api/v1/products", products_1.default);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/orders", orderRoutes_1.default);
// paypal url
app.get('/api/v1/config/paypal', (req, res) => res.send({ cliendId: process.env.PAYPAL_CLIENT_ID }));
const UPLOAD_DIR = path_1.default.join(__dirname, 'uploads');
app.use('/uploads', express_1.default.static(UPLOAD_DIR));
app.use('/api/v1/upload', uploadRoutes_1.default);
// app.use(cors({
//     origin: 'http://localhost:3000' // Allow requests from this origin
// }));
app.use(error_1.default);
app.listen(5005, () => console.log(`Server is running on port ${5005}`));
