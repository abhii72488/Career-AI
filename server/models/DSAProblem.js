import mongoose from 'mongoose';

const DSAProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // Arrays, DP, Graphs, Trees, Strings, Linked List, etc.
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  description: { type: String, required: true },
  problemNumber: { type: Number },
  officialUrl: { type: String }, // e.g. https://leetcode.com/problems/two-sum/
  examples: [
    {
      input: String,
      output: String,
      explanation: String
    }
  ],
  constraints: [String],
  starterCode: {
    javascript: String,
    java: String,
    python: String,
    cpp: String
  },
  testCases: [
    {
      input: String,
      expectedOutput: String,
      isHidden: { type: Boolean, default: false }
    }
  ],
  explanation: String,
  timeComplexity: String,
  spaceComplexity: String,

  // Live Metadata Fields
  source: { type: String, default: 'LeetCode / CareerAI Curated' },
  sourceId: { type: String },
  sourceType: { type: String, default: 'official-link' },
  retrievedAt: { type: Date, default: Date.now },
  lastVerifiedAt: { type: Date, default: Date.now },
  confidence: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'HIGH' },
  freshness: { type: String, enum: ['LIVE', 'RECENT', 'CACHED', 'STALE'], default: 'LIVE' }
}, { timestamps: true });

export default mongoose.models.DSAProblem || mongoose.model('DSAProblem', DSAProblemSchema);
