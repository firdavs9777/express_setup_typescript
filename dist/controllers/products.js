"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = async (req, res, next) => {
    try {
        const products = await product_1.default.find();
        res.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProducts = getProducts;
const getProduct = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const product = await product_1.default.findById({ _id: productId });
        if (!product) {
            console.log(res.status);
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProduct = getProduct;
// export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
//   const todoId = req.params.id;
//   const updatedText = (req.body as { text: string }).text;
//   const todoIndex = TODOS.findIndex(todo => todoId === todoId);
//   if (todoIndex < 0)
//   {
//     throw new Error('Could not find todo item');
//   }
//   TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
//   res.json({ message: 'Updated', updateTodo: TODOS[todoIndex] });
// }
// export const deleteToDo: RequestHandler = (req, res, next) => {
//   const todoId = req.params.todoId;
//   const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
//   if (todoIndex === -1)
//   {
//     return res.status(404).json({ message: 'Todo not found' }); 
//   }
//   TODOS.splice(todoIndex, 1);
//   res.status(200).json({ mesage: 'Todo deleted' });
// }
