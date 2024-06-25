import { Router } from 'express';
import { createProduct, getProduct, getProducts, updateProduct } from '../controllers/products';
import { admin, protect } from '../middleware/authMiddleware';

const ProductRouter = Router();

ProductRouter.get('/', getProducts);

ProductRouter.use(protect, admin)
ProductRouter.get('/:id', getProduct)
ProductRouter.put('/:id',updateProduct);
ProductRouter.post('/', createProduct)
export default ProductRouter;