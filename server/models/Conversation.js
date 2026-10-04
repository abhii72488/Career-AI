import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  conversationId: { type: String, required: true, unique: true },
  title: { type: String, default: 'Placement AI Conversation' },
  messages: [{
    sender: { type: String, enum: ['USER', 'AI'], required: true },
    text: { type: String, required: true },
    sources: [{
      filename: String,
      pageNumber: Number,
      chunkIndex: Number
    }],
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
