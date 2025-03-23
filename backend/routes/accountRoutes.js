import express from 'express';
import { createAccount, getAccount, depositMoney } from '../controllers/accountController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createAccount);
router.get('/:id', authMiddleware, getAccount);
router.post('/deposit', authMiddleware, depositMoney);
export default router;
