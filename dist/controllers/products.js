"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
// @desc: Fetch All Products
// @route GET /api/v1/products
// @access: Public
const getProducts = async (req, res, next) => {
    try {
        const products = await product_1.default.find();
        const responseData = {
            count: products.length,
            data: products,
            message: 'success'
        };
        res.json(responseData);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getProducts = getProducts;
// @desc: Fetch Single Product
// @route GET /api/v1/products/:id
// @access: Private
const getProduct = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const product = await product_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const responseData = {
            data: product,
            message: 'success'
        };
        res.json(responseData);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getProduct = getProduct;
