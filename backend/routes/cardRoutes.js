import express from 'express';
import { requestCard, activateCard, deactivateCard, getUserCards,getCardRequests } from '../controllers/cardController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/request', requestCard);
router.get("/", getCardRequests); // ✅ Get all card requests

router.post('/activate', authMiddleware, activateCard);
router.post('/deactivate', authMiddleware, deactivateCard);
router.get('/:userID', authMiddleware, getUserCards);

export default router;
