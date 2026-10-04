import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { memoryStore } from '../utils/memoryStore.js';
import { env } from '../config/env.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Please log in.',
      errorCode: 'NO_TOKEN'
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    
    // Check if user exists in MongoDB or MemoryStore
    let user = null;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      user = null;
    }

    if (!user) {
      user = memoryStore.users.find(u => u._id === decoded.id || u.id === decoded.id);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists or session expired.',
        errorCode: 'INVALID_USER'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed.',
      errorCode: 'TOKEN_EXPIRED'
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Admin privileges required.',
      errorCode: 'FORBIDDEN'
    });
  }
};
