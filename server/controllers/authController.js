import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { memoryStore } from '../utils/memoryStore.js';
import { checkMongoStatus } from '../config/db.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'career_ai_super_secret_jwt_key_2026_placement_ready', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      college,
      degree,
      branch,
      graduationYear,
      skills,
      targetRole,
      targetCompany,
      dailyHours
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user_${Date.now()}`;

    const formattedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map(s => s.trim()).filter(Boolean)
      : ['Java', 'React', 'SQL', 'Basic DSA'];

    const newUserObj = {
      _id: userId,
      id: userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: email.toLowerCase().includes('admin') ? 'ADMIN' : 'USER',
      college: college || 'Delhi Technological University',
      degree: degree || 'B.Tech',
      branch: branch || 'Computer Science',
      graduationYear: graduationYear ? Number(graduationYear) : 2026,
      skills: formattedSkills,
      targetRole: targetRole || 'Software Developer',
      targetCompany: targetCompany || 'TCS',
      dailyHours: dailyHours ? Number(dailyHours) : 4,
      readinessScore: 72,
      scores: { dsa: 65, aptitude: 80, sql: 55, development: 85, communication: 50, interview: 60, resume: 75 },
      streak: { current: 1, longest: 1, lastActive: new Date().toISOString() },
      createdAt: new Date().toISOString()
    };

    if (checkMongoStatus()) {
      try {
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) return res.status(400).json({ success: false, message: 'User already exists with this email' });
        const createdUser = await User.create({
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: newUserObj.role,
          college: newUserObj.college,
          degree: newUserObj.degree,
          branch: newUserObj.branch,
          graduationYear: newUserObj.graduationYear,
          skills: newUserObj.skills,
          targetRole: newUserObj.targetRole,
          targetCompany: newUserObj.targetCompany,
          dailyHours: newUserObj.dailyHours
        });
        const token = generateToken(createdUser._id);
        const userObj = createdUser.toObject();
        delete userObj.password;
        return res.status(201).json({ success: true, token, user: userObj });
      } catch (err) {
        console.warn('Mongo create user failed, using memory store fallback');
      }
    }

    // Memory Store Fallback
    const existing = memoryStore.users.find(u => u.email === email.toLowerCase());
    if (existing) return res.status(400).json({ success: false, message: 'User already exists with this email' });

    memoryStore.users.push(newUserObj);
    const token = generateToken(userId);
    const safeUser = { ...newUserObj };
    delete safeUser.password;

    res.status(201).json({ success: true, token, user: safeUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    let user = null;
    if (checkMongoStatus()) {
      try {
        user = await User.findOne({ email: email.toLowerCase() });
      } catch (e) { user = null; }
    }

    if (!user) {
      user = memoryStore.users.find(u => u.email === email.toLowerCase());
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id || user.id);
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;

    res.status(200).json({ success: true, token, user: userObj });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  const userObj = req.user.toObject ? req.user.toObject() : { ...req.user };
  delete userObj.password;
  res.status(200).json({ success: true, user: userObj });
};
