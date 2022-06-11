import express from 'express';
import { verifyToken, verifyTokenAndAdminAuth } from '../controllers/middleware.js';
import { getAllUsers } from '../controllers/user.js';
const router = express.Router();

router.get("/getAllUsers", getAllUsers);

export default router;