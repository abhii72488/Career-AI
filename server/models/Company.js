import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  logo: { type: String, default: '🏢' },
  category: { type: String, default: 'IT Services' }, // Service Based, Product Based, Tech Giant, Consulting
  website: { type: String },
  careersUrl: { type: String },
  locations: [{ type: String }],
  companyDescription: { type: String },
  
  eligibility: {
    minCgpa: mongoose.Schema.Types.Mixed,
    allowedBranches: [String],
    maxBacklogs: mongoose.Schema.Types.Mixed
  },
  selectionStages: [
    {
      stageName: String,
      description: String,
      duration: String,
      cutoffHint: String
    }
  ],
  importantTopics: {
    aptitude: [String],
    coding: [String],
    sql: [String],
    technical: [String],
    hr: [String]
  },
  dayPlan: [
    {
      day: Number,
      focus: String,
      tasks: [String]
    }
  ],
  
  // Dynamic Live Evidence & Transparency
  hiringConfidence: {
    type: String,
    enum: ['VERIFIED', 'REPORTED', 'COMMUNITY-REPORTED', 'ESTIMATED'],
    default: 'VERIFIED'
  },
  sourceName: { type: String, default: 'Official Company Careers Page' },
  sourceUrl: { type: String },
  retrievedAt: { type: Date, default: Date.now },
  lastVerifiedAt: { type: Date, default: Date.now },
  freshness: { type: String, enum: ['LIVE', 'RECENT', 'CACHED', 'STALE'], default: 'LIVE' },
  lastUpdated: { type: String, default: '2026' }
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
