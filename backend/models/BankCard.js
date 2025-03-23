import mongoose from 'mongoose';

const BankCardSchema = new mongoose.Schema({
    cardNumber: { type: String, unique: true, required: true },
    status: { type: String, enum: ['REQUESTED', 'ACTIVE', 'INACTIVE'], default: 'REQUESTED' },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('BankCard', BankCardSchema);
