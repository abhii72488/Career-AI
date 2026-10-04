import User from '../models/User.js';
import { memoryStore } from '../utils/memoryStore.js';
import { checkMongoStatus } from '../config/db.js';
import { getRealUserActivities } from '../utils/userProgress.js';

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const updates = req.body;

    if (checkMongoStatus()) {
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
        if (updatedUser) return res.status(200).json({ success: true, user: updatedUser });
      } catch (err) {
        console.warn('Mongo update user failed, updating memory store');
      }
    }

    const memUser = memoryStore.users.find(u => u._id === userId || u.id === userId);
    if (memUser) {
      Object.assign(memUser, updates);
      const safeUser = { ...memUser };
      delete safeUser.password;
      return res.status(200).json({ success: true, user: safeUser });
    }

    res.status(404).json({ success: false, message: 'User profile not found' });
  } catch (error) {
    next(error);
  }
};

export const getActivities = async (req, res) => {
  const userId = req.user._id || req.user.id;
  const activities = getRealUserActivities(userId);
  res.status(200).json({ success: true, activities });
};

