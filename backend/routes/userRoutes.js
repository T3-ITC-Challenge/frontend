import express from "express";
import { createUser } from "../controllers/userController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import { getUsers } from "../controllers/userController.js";
const router = express.Router();

router.post("/create", authMiddleware, createUser); // Only admins can create users


// Get all users (GET /api/users)
router.get("/", getUsers);

export default router;
