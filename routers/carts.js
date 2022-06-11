import express from 'express';
import { createCart, getCartByUser, getCarts } from '../controllers/cart.js';
const router = express.Router();

router.get('/getCarts', getCarts);
router.post('/createCart', createCart)
router.get('/getCartsByUser/:userId', getCartByUser)

export default router;