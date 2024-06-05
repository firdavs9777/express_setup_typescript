"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
const cors = require('cors');
const error_1 = __importDefault(require("./middleware/error"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Dotenv implemented and imported
dotenv_1.default.config();
// Connect to Database 
(0, db_1.default)();
// const port:number = parseInt(process.env.PORT || '5002', 10);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use('/todos', todoRoutes);
app.use(cors());
// Cookie Parser Middleware
app.use((0, cookie_parser_1.default)());
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.use('/api/v1/products', products_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.use(error_1.default);
app.listen(5004, () => console.log(`Server is running on port ${5004}`));
