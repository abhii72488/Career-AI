import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  college: { type: String, default: '' },
  degree: { type: String, default: '' },
  branch: { type: String, default: '' },
  graduationYear: { type: Number, default: 2026 },
  skills: [{ type: String }],
  targetRole: { type: String, default: 'Software Developer' },
  targetCompany: { type: String, default: 'TCS' },
  experienceLevel: { type: String, default: 'Fresher' },
  dailyHours: { type: Number, default: 4 },
  targetDate: { type: String, default: '' },
  preferredCompanies: [{ type: String }],
  readinessScore: { type: Number, default: 72 },
  scores: {
    dsa: { type: Number, default: 65 },
    aptitude: { type: Number, default: 80 },
    sql: { type: Number, default: 55 },
    development: { type: Number, default: 85 },
    communication: { type: Number, default: 50 },
    interview: { type: Number, default: 60 },
    resume: { type: Number, default: 75 }
  },
  streak: {
    current: { type: Number, default: 1 },
    longest: { type: Number, default: 1 },
    lastActive: { type: Date, default: Date.now }
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
