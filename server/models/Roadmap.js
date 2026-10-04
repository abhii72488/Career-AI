import mongoose from 'mongoose';

const RoadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  targetRole: { type: String, default: 'Software Developer' },
  targetCompany: { type: String, default: 'TCS' },
  readinessScore: { type: Number, default: 70 },
  roadmap: {
    dailyTasks: [String],
    weeklyGoals: [String],
    weakTopics: [String],
    revisionSchedule: [String],
    dsaRecommendations: [String],
    projectPreparation: [String],
    resumeImprovements: [String]
  }
}, { timestamps: true });

export default mongoose.models.Roadmap || mongoose.model('Roadmap', RoadmapSchema);
