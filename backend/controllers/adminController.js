import User from '../models/user.model.js';
import CardRequest from '../models/cardRequest.model.js';

export const adminController = {
  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
        .select('-password -__v')
        .populate('accounts');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  
  manageUserStatus: async (req, res) => {
    const { userId, status } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive: status === 'activate' },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  
  approveCardRequest: async (req, res) => {
    const { requestId } = req.params;
    try {
      const cardRequest = await CardRequest.findByIdAndUpdate(
        requestId,
        { status: 'approved' },
        { new: true }
      );
      
      
      res.json(cardRequest);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};