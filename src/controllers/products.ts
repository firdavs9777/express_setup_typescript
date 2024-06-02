import { RequestHandler } from 'express';
import Product from '../models/product';
import { ProductType } from '../data/products';

interface DataType {
    data: ProductType[],
    message: string;
    count: number;
}
//@desc: Fetch All Products
//@route GET /api/v1/products
//@access: Public
export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await Product.find();
        const responseData: DataType = {
            count: products.length,
            data: products,
            message: 'success'
          };
          res.json(responseData);

      } catch (error: any | object) {
        res.status(404);
        throw new Error(error.mesage)
      }
}
//@desc: Fetch Single Product
//@route GET /api/v1/products/:id
//@access: Private

export const getProduct: RequestHandler = async (req,res, next) => {
    const productId: string = req.params.id;
    try {
      const product = await Product.findById({_id: productId});
      if (!product) {

        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error: object | any) {
        res.status(404);
       throw new Error(error.message)
    }
}



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