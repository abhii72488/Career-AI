import mongoose from 'mongoose';

const externalSourceSchema = new mongoose.Schema({
  sourceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // jobs, dsa, github, company, news, resources, interview
  type: { type: String, required: true },     // official-api, public-feed, licensed-dataset, web-retrieval
  baseUrl: { type: String },
  status: { type: String, enum: ['HEALTHY', 'DELAYED', 'ERROR', 'DISABLED'], default: 'HEALTHY' },
  lastSyncAt: { type: Date, default: Date.now },
  nextSyncAt: { type: Date },
  recordCount: { type: Number, default: 0 },
  errorCount: { type: Number, default: 0 },
  lastError: { type: String },
  rateLimitMs: { type: Number, default: 1000 },
  license: { type: String, default: 'Public / Permitted Use' },
  confidenceDefault: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'HIGH' }
}, { timestamps: true });

export default mongoose.models.ExternalSource || mongoose.model('ExternalSource', externalSourceSchema);
