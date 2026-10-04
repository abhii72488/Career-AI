import { analyzeJobMatch } from '../services/jobMatchService.js';
import JobMatch from '../models/JobMatch.js';
import Resume from '../models/Resume.js';
import { memoryStore } from '../utils/memoryStore.js';

export const analyzeJobDescription = async (req, res, next) => {
  try {
    const { jobDescriptionText, jobTitle, companyName } = req.body;
    if (!jobDescriptionText || jobDescriptionText.trim().length < 15) {
      return res.status(400).json({ success: false, message: 'Please provide a valid Job Description string' });
    }

    const userId = req.user._id || req.user.id;
    const userSkills = req.user.skills || ['Java', 'React', 'Node.js', 'SQL', 'Basic DSA'];

    // Try to pull user's latest uploaded resume text
    let resumeText = '';
    try {
      const latestResume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
      if (latestResume) resumeText = latestResume.resumeText;
    } catch (e) {
      resumeText = memoryStore.resumes[userId]?.text || '';
    }

    const report = await analyzeJobMatch(jobDescriptionText, resumeText, userSkills, req.user.targetRole);
    memoryStore.jobMatches[userId] = report;

    try {
      await JobMatch.create({
        userId,
        jobTitle: jobTitle || 'Software Developer',
        companyName: companyName || 'Target Company',
        jobDescription: jobDescriptionText,
        matchResult: {
          matchPercentage: report.matchPercentage,
          matchedSkills: report.matchedSkills || [],
          missingSkills: report.missingSkills || [],
          requiredSkills: report.requiredSkills || [],
          strengths: report.strengths || [],
          weaknesses: report.weaknesses || [],
          recommendations: report.recommendations || [],
          interviewTopics: report.interviewTopics || []
        }
      });
    } catch (dbErr) {
      console.warn('[JobMatch Model Warning] Saved to memory store, Mongo save bypassed:', dbErr.message);
    }

    res.status(200).json({
      success: true,
      report,
      message: 'Job compatibility report generated successfully'
    });
  } catch (error) {
    next(error);
  }
};
