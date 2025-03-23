import express from 'express';
import { transferMoney } from '../controllers/transactionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/transfer', authMiddleware, transferMoney);

export default router;