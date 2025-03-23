import Notification from '../models/notification.model.js';

export const notificationController = {
  
  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find({
        userId: req.user.id,
        read: false
      }).sort('-createdAt');
      
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  
  markAsRead: async (req, res) => {
    const { notificationId } = req.params;
    try {
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true }
      );
      res.json(notification);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  
  updatePreferences: async (req, res) => {
    const { preferences } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { notificationPreferences: preferences },
        { new: true }
      );
      res.json(user.notificationPreferences);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};