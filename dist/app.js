"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import
const todos_1 = __importDefault(require("./routes/todos"));
const body_parser_1 = require("body-parser");
const port = 5000;
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/todos', todos_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get('/', (req, res) => {
    res.send('Api is running');
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
