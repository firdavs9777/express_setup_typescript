import { Router } from 'express';
import { createProduct, createProductReview, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products';
import { admin, protect } from '../middleware/authMiddleware';
const ProductRouter = Router();
ProductRouter.get('/', getProducts);
ProductRouter.use(protect, admin)
ProductRouter.get('/:id', getProduct)
ProductRouter.put('/:id', updateProduct);
ProductRouter.use(protect, admin);
ProductRouter.delete('/:id',deleteProduct);
ProductRouter.post('/', createProduct)
ProductRouter.use(protect);
ProductRouter.post('/:id/reviews', createProductReview);
export default ProductRouter;