import mongoose from 'mongoose';

const DSAAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  problemId: { type: String, required: true },
  problemTitle: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  language: { type: String, default: 'java' },
  code: { type: String, required: true },
  status: { type: String, enum: ['ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'COMPILE_ERROR'], required: true },
  timeComplexity: { type: String },
  spaceComplexity: { type: String },
  executionTimeMs: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.DSAAttempt || mongoose.model('DSAAttempt', DSAAttemptSchema);
