import mongoose from 'mongoose';

const interviewReportSchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  role: { type: String, default: 'Software Developer' },
  topic: { type: String, default: 'Technical' },
  question: { type: String, required: true },
  answerGuidance: { type: String },
  
  // Attribution & Transparency
  reportType: { type: String, enum: ['VERIFIED', 'REPORTED', 'COMMUNITY-REPORTED', 'ESTIMATED'], default: 'COMMUNITY-REPORTED' },
  confidence: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'MEDIUM' },
  sourceName: { type: String, required: true },
  sourceUrl: { type: String },
  sourceType: { type: String, default: 'public-interview-report' },
  publishedAt: { type: Date, default: Date.now },
  retrievedAt: { type: Date, default: Date.now },
  lastVerifiedAt: { type: Date, default: Date.now },
  freshness: { type: String, enum: ['LIVE', 'RECENT', 'CACHED', 'STALE'], default: 'RECENT' }
}, { timestamps: true });

export default mongoose.models.InterviewReport || mongoose.model('InterviewReport', interviewReportSchema);
