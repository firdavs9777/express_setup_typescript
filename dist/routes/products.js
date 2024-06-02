"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const ProductRouter = (0, express_1.Router)();
ProductRouter.get('/', products_1.getProducts);
ProductRouter.get('/:id', products_1.getProduct);
exports.default = ProductRouter;
