import mongoose from 'mongoose';

const DocumentChunkSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  filename: { type: String, required: true },
  chunkIndex: { type: Number, required: true },
  content: { type: String, required: true },
  embedding: [{ type: Number }],
  pageNumber: { type: Number, default: 1 },
  source: { type: String, default: 'Uploaded Document' }
}, { timestamps: true });

export default mongoose.models.DocumentChunk || mongoose.model('DocumentChunk', DocumentChunkSchema);
