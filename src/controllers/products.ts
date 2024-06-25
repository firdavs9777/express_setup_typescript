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
        const products:ProductType[] = await Product.find();
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


// @desc: Create Single Product
// @route POST /api/v1/products
// @access: Private/ Admin
export const createProduct: RequestHandler = async (req: any, res, next) => {
    const userId: string = req.user._id;

    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: userId,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 10,
        numReviews: 0,
        rating:10,
        description:'Sample Description'
    });
    const createdProduct = await product.save();
    console.log(createProduct);
    res.status(200).json(createProduct);

};


// @desc: Update Single Product
// @route PUT /api/v1/products/:id
// @access: Private/ Admin
export const updateProduct: RequestHandler = async (req: any, res, next) => {
    const productId: string = req.params.id;
    const { name, price, image, brand, category, countInStock, numReviews, rating, description } = req.body;

    try {
        const product = await Product.findById(productId);
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
        const responseData: DataType<ProductType> = {
            data: updatedProduct,
            message: 'Product updated successfully'
        };
        res.json(responseData);
    } catch (error: any) {
        res.status(400); throw new Error('Resource not found');
    }

};


// @desc: Delete Single Product
// @route DELETE /api/v1/products/:id
// @access: Private/ Admin
export const deleteProduct: RequestHandler = async (req: any, res, next) => {
  
};