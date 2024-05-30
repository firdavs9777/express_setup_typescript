"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = require("../data/products");
const app = (0, express_1.default)();
const cors = require('cors');
// Dotenv implemented and imported
dotenv_1.default.config();
const port = parseInt(process.env.PORT || '5002', 10);
app.use((0, body_parser_1.json)());
app.use('/todos', todos_1.default);
app.use(cors);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get('/', (req, res) => {
    console.log(req);
    res.send('Api is running');
});
app.get('/api/v1/products', (req, res) => {
    res.json(products_1.products);
});
app.get('/api/v1/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products_1.products.find((p) => p.id === id);
    res.json(product);
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
