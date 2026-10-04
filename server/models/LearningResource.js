import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  topic: { type: String, required: true }, // Spring Boot, System Design, DSA, SQL, etc.
  difficulty: { type: String, default: 'Beginner' },
  authorOrProvider: { type: String },
  
  sourceName: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  sourceType: { type: String, default: 'official-documentation' },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  retrievedAt: { type: Date, default: Date.now },
  lastVerifiedAt: { type: Date, default: Date.now },
  confidence: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'HIGH' },
  freshness: { type: String, enum: ['LIVE', 'RECENT', 'CACHED', 'STALE'], default: 'LIVE' }
}, { timestamps: true });

export default mongoose.models.LearningResource || mongoose.model('LearningResource', learningResourceSchema);
