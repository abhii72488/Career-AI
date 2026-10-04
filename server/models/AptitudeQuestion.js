import mongoose from 'mongoose';

const AptitudeQuestionSchema = new mongoose.Schema({
  category: { type: String, enum: ['Quantitative', 'Reasoning', 'English'], required: true },
  topic: { type: String, required: true }, // Time & Work, Profit & Loss, Syllogism, Vocabulary, etc.
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  explanation: { type: String, required: true },
  companyTag: [String]
}, { timestamps: true });

export default mongoose.models.AptitudeQuestion || mongoose.model('AptitudeQuestion', AptitudeQuestionSchema);
