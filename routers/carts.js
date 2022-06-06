import express from 'express';
import { addToCart, deleteCart, getCart } from '../controllers/cart.js';
const router = express.Router();

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:id', deleteCart);

export default router;