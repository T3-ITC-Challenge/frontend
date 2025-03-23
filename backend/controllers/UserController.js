import User from '../models/user.model.js';
import { generateAuditLog } from '../utils/auditLogger.js';

export const userController = {
  
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .select('-password -__v -temporaryPassword')
        .populate('accounts');
      
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  
  updateProfile: async (req, res) => {
    const { email, phone } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { email, phone } },
        { new: true, runValidators: true }
      ).select('-password -__v');

      await generateAuditLog(req.user.id, 'PROFILE_UPDATE', 'User');
      
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },


  deactivateAccount: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, { isActive: false });
      res.json({ message: 'Account deactivated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};