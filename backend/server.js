import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors"; 

// Import models
import User from "./models/User.js";
import bcrypt from "bcryptjs";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // Add user routes
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/cards', cardRoutes);
app.use("/api/users", userRoutes); // Add user routes


// ✅ Create Default Admin Function
const createAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN" });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);

            const admin = new User({
                email: process.env.ADMIN_EMAIL || "admin@itcash.com",
                password: hashedPassword,
                role: "ADMIN"
            });

            await admin.save();
            console.log("✅ Default Admin Created: Email:", admin.email);
        } else {
            console.log("✅ Admin already exists.");
        }
    } catch (error) {
        console.error("❌ Error creating admin:", error);
    }
};

// Start Server
const PORT = process.env.PORT || 5000;

connectDB()
    .then(async () => {
        console.log("✅ MongoDB Connected");
        await createAdminUser(); // Ensure admin user is created
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

//cq3nhbrgXT9tg8Og
// t6tiJMMj6gFhWogz