import mongoose from 'mongoose';

const MockSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sessionId: { type: String, required: true, unique: true },
  company: { type: String, default: 'General' },
  role: { type: String, default: 'Software Engineer' },
  interviewType: { type: String, default: 'Technical' }, // HR, Technical, DSA, Java, SQL, etc.
  difficulty: { type: String, default: 'Medium' },
  totalQuestions: { type: Number, default: 5 },
  status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED'], default: 'IN_PROGRESS' },
  qaHistory: [{
    questionNumber: Number,
    question: String,
    expectedKeyPoints: [String],
    userAnswer: String,
    evaluation: {
      score: Number,
      technicalCorrectness: Number,
      communication: Number,
      feedback: String,
      idealAnswer: String
    }
  }],
  finalReport: {
    overallScore: Number,
    categoryScores: {
      technical: Number,
      communication: Number,
      problemSolving: Number,
      structure: Number
    },
    weakAreas: [String],
    strongAreas: [String],
    recommendedTopics: [String],
    nextSteps: [String]
  }
}, { timestamps: true });

export default mongoose.models.MockSession || mongoose.model('MockSession', MockSessionSchema);
