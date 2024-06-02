import { Router } from 'express';
import { getProduct, getProducts } from '../controllers/products';

const ProductRouter = Router();

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProduct);
export default ProductRouter;