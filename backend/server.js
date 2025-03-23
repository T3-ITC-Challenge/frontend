require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(require('cors')());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));

// Start Server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//cq3nhbrgXT9tg8Og