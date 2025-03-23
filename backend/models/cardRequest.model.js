const mongoose = require('mongoose');

const cardRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cardType: {
        type: String,
        required: true,
        enum: ['debit', 'credit', 'prepaid']
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    approvalDate: {
        type: Date
    }
});

const CardRequest = mongoose.model('CardRequest', cardRequestSchema);

module.exports = CardRequest;