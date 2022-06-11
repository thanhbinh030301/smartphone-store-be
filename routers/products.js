import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductBySlug, updateProduct } from '../controllers/product.js';
const router = express.Router();

router.get('/', getProduct);
router.get('/:slug', getProductBySlug);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.post('/add', addProduct)
export default router;