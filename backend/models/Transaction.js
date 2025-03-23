import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: { type: mongoose.Decimal128, required: true },
    senderAccountID: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount', required: true },
    recipientAccountID: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount', required: true },
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;