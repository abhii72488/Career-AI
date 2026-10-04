import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  originalFilename: { type: String, default: 'resume.pdf' },
  resumeText: { type: String, required: true },
  analysis: {
    overallScore: { type: Number, default: 0 },
    atsScore: { type: Number, default: 0 },
    sectionScores: {
      skills: { type: Number, default: 0 },
      projects: { type: Number, default: 0 },
      experience: { type: Number, default: 0 },
      keywords: { type: Number, default: 0 }
    },
    extractedInfo: {
      name: String,
      email: String,
      skills: [String],
      softSkills: [String],
      projects: [String],
      education: String,
      certifications: [String]
    },
    strengths: [String],
    weaknesses: [String],
    missingSkills: [String],
    formattingWarnings: [String],
    recommendations: [String],
    bulletRewrites: [{
      id: String,
      original: String,
      improved: String
    }]
  }
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
