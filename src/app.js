"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import
var todos_1 = require("./routes/todos");
var body_parser_1 = require("body-parser");
var port = 5000;
var app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/todos', todos_1.default);
app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
});
app.get('/', function (req, res) {
    res.send('Api is running');
});
app.listen(port, function () { return console.log("Server is running on port ".concat(port)); });
