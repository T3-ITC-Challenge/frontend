const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({
    accountNumber: { type: String, unique: true, required: true },
    balance: { type: mongoose.Decimal128, required: true, default: 0.00 },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('BankAccount', BankAccountSchema);
