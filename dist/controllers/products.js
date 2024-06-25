"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
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
// @desc: Create Single Product
// @route POST /api/v1/products
// @access: Private/ Admin
const createProduct = async (req, res, next) => {
    const userId = req.user._id;
    const product = new product_1.default({
        name: 'Sample Name',
        price: 0,
        user: userId,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 10,
        numReviews: 0,
        rating: 10,
        description: 'Sample Description'
    });
    const createdProduct = await product.save();
    console.log(exports.createProduct);
    res.status(200).json(exports.createProduct);
};
exports.createProduct = createProduct;
// @desc: Update Single Product
// @route PUT /api/v1/products/:id
// @access: Private/ Admin
const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    const { name, price, image, brand, category, countInStock, numReviews, rating, description } = req.body;
    try {
        const product = await product_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        product.name = name || product.name;
        product.price = price || product.price;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        product.numReviews = numReviews || product.numReviews;
        product.rating = rating || product.rating;
        product.description = description || product.description;
        const updatedProduct = await product.save();
        const responseData = {
            data: updatedProduct,
            message: 'Product updated successfully'
        };
        res.json(responseData);
    }
    catch (error) {
        res.status(400);
        throw new Error('Resource not found');
    }
};
exports.updateProduct = updateProduct;
// @desc: Delete Single Product
// @route DELETE /api/v1/products/:id
// @access: Private/ Admin
const deleteProduct = async (req, res, next) => {
};
exports.deleteProduct = deleteProduct;
