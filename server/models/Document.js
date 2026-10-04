import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  filename: { type: String, required: true },
  documentType: { type: String, enum: ['Placement PDF', 'Interview Experience', 'Job Description', 'Notes', 'Study Material', 'Resume', 'Other'], default: 'Placement PDF' },
  mimeType: { type: String, default: 'application/pdf' },
  sizeBytes: { type: Number, default: 0 },
  extractedText: { type: String, required: true },
  chunkCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);
