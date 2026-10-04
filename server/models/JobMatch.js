import mongoose from 'mongoose';

const JobMatchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  jobTitle: { type: String, default: 'Software Engineer' },
  companyName: { type: String, default: 'Target Company' },
  jobDescription: { type: String, required: true },
  matchResult: {
    matchPercentage: { type: Number, required: true },
    matchedSkills: [String],
    missingSkills: [String],
    requiredSkills: [String],
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    interviewTopics: [String]
  }
}, { timestamps: true });

export default mongoose.models.JobMatch || mongoose.model('JobMatch', JobMatchSchema);
