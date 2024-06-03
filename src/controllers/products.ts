import { RequestHandler } from 'express';
import Product from '../models/product';
import { ProductType } from '../data/products';

interface DataType<T> {
    data: T;
    message: string;
    count?: number;
}

// @desc: Fetch All Products
// @route GET /api/v1/products
// @access: Public
export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await Product.find();
        const responseData: DataType<ProductType[]> = {
            count: products.length,
            data: products,
            message: 'success'
        };
        res.json(responseData);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// @desc: Fetch Single Product
// @route GET /api/v1/products/:id
// @access: Private
export const getProduct: RequestHandler = async (req, res, next) => {
    const productId: string = req.params.id;
    
    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        const responseData: DataType<ProductType> = {
            data: product,
            message: 'success'
        };
        res.json(responseData);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
