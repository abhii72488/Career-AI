import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: { type: String },
  location: { type: String, default: 'Remote / India' },
  isRemote: { type: Boolean, default: false },
  employmentType: { type: String, default: 'Full-time' }, // Full-time, Internship, Contract
  requiredSkills: [{ type: String }],
  experience: { type: String, default: 'Fresher / 0-2 Yrs' },
  salary: { type: String, default: 'Not Disclosed' },
  description: { type: String },
  officialApplyUrl: { type: String, required: true },
  
  // Live Source Metadata
  sourceName: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  sourceType: { type: String, default: 'official-api' }, // official-api, public-feed, careers-page
  retrievedAt: { type: Date, default: Date.now },
  postedAt: { type: Date, default: Date.now },
  lastVerifiedAt: { type: Date, default: Date.now },
  license: { type: String, default: 'Public API / Careers' },
  confidence: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'HIGH' },
  freshness: { type: String, enum: ['LIVE', 'RECENT', 'CACHED', 'STALE', 'EXPIRED'], default: 'LIVE' },
  linkStatus: { type: String, enum: ['ACTIVE', 'REDIRECTED', 'BROKEN', 'UNAVAILABLE'], default: 'ACTIVE' }
}, { timestamps: true });

jobSchema.index({ title: 'text', company: 'text', requiredSkills: 'text' });

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
