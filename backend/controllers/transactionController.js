import Transaction from '../models/Transaction.js';
import BankAccount from '../models/BankAccount.js';

export const transferMoney = async (req, res) => {
    try {
        const { senderAccountID, recipientAccountID, amount } = req.body;

        const sender = await BankAccount.findById(senderAccountID);
        const recipient = await BankAccount.findById(recipientAccountID);

        if (!sender || !recipient) return res.status(404).json({ msg: "Invalid accounts" });
        if (sender.balance < amount) return res.status(400).json({ msg: "Insufficient funds" });

        sender.balance -= parseFloat(amount);
        recipient.balance += parseFloat(amount);

        await sender.save();
        await recipient.save();

        const transaction = new Transaction({ senderAccountID, recipientAccountID, amount });
        await transaction.save();

        res.json({ msg: "Transfer successful", transaction });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};