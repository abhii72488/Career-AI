import mongoose from 'mongoose';

const newsItemSchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, default: 'Placement Drive' }, // Hiring Announcement, Tech Trend, Internship, Recruitment
  
  sourceName: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  retrievedAt: { type: Date, default: Date.now },
  lastVerifiedAt: { type: Date, default: Date.now },
  confidence: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'HIGH' },
  freshness: { type: String, enum: ['LIVE', 'RECENT', 'CACHED', 'STALE'], default: 'LIVE' }
}, { timestamps: true });

export default mongoose.models.NewsItem || mongoose.model('NewsItem', newsItemSchema);
