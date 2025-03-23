import BankAccount from '../models/BankAccount.js';
import User from '../models/User.js';

// Create a new bank account
export const createAccount = async (req, res) => {
    try {
        const { userID } = req.body;
        const user = await User.findById(userID);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Random 10-digit number

        const newAccount = new BankAccount({
            userID,
            accountNumber,
            balance: 0.00
        });

        await newAccount.save();
        res.status(201).json({ msg: "Bank account created", account: newAccount });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Get account details by ID
export const getAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await BankAccount.findById(id).populate('userID', 'email');
        if (!account) return res.status(404).json({ msg: "Account not found" });

        res.json(account);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Deposit money into an account
export const depositMoney = async (req, res) => {
    try {
        const { accountID, amount } = req.body;
        const account = await BankAccount.findById(accountID);
        if (!account) return res.status(404).json({ msg: "Account not found" });

        account.balance += parseFloat(amount);
        await account.save();

        res.json({ msg: "Deposit successful", balance: account.balance });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};