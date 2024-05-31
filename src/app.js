"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos_1 = require("./routes/todos");
var body_parser_1 = require("body-parser");
var dotenv_1 = require("dotenv");
var products_1 = require("./data/products");
var app = (0, express_1.default)();
var cors = require('cors');
// Dotenv implemented and imported
dotenv_1.default.config();
// const port:number = parseInt(process.env.PORT || '5002', 10);
app.use((0, body_parser_1.json)());
app.use('/todos', todos_1.default);
app.use(cors);
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
});
app.get('/', function (req, res) {
    console.log(req);
    res.send('Api is running');
});
app.get('/api/v1/products', function (req, res) {
    res.json(products_1.products);
});
app.get('/api/v1/products/:id', function (req, res) {
    var id = Number(req.params.id);
    var product = products_1.products.find(function (p) { return p.id === id; });
    res.json(product);
});
app.listen(5001, function () { return console.log("Server is running on port ".concat(5001)); });
