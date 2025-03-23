import Account from '../models/account.model.js';
import Transaction from '../models/transaction.model.js';

export const accountController = {
  // Get account balance
  getBalance: async (req, res) => {
    try {
      const account = await Account.findOne({ userId: req.user.id });
      res.json({ balance: account.balance });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  
  getStatement: async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      const statement = await Transaction.aggregate([
        {
          $match: {
            account: req.user.accountId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
          }
        },
        {
          $project: {
            _id: 0,
            amount: 1,
            type: 1,
            date: 1,
            description: 1
          }
        }
      ]);
      
      res.json(statement);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },


  transferFunds: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const { fromAccount, toAccount, amount } = req.body;

      
      const sender = await Account.findOneAndUpdate(
        { _id: fromAccount, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { new: true, session }
      );

      if (!sender) throw new Error('Insufficient funds');

      
      await Account.findByIdAndUpdate(
        toAccount,
        { $inc: { balance: amount } },
        { session }
      );

      
      const transaction = new Transaction({
        fromAccount,
        toAccount,
        amount,
        type: 'TRANSFER'
      });
      await transaction.save({ session });

      await session.commitTransaction();
      res.json(transaction);
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({ message: error.message });
    } finally {
      session.endSession();
    }
  }
};