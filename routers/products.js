import express from 'express';
import { getProduct, getProductBySlug } from '../controllers/Product.js';
const router = express.Router();

router.get('/', getProduct);
router.get('/:slug', getProductBySlug);

export default router;