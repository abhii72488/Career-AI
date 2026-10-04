import { parseResumeText, analyzeResumeContent, rewriteSingleBullet } from '../services/resumeService.js';
import Resume from '../models/Resume.js';
import { memoryStore } from '../utils/memoryStore.js';
import { updateRealUserProgress } from '../utils/userProgress.js';

export const analyzeResume = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let resumeText = req.body.resumeText || '';
    const originalFilename = req.file?.originalname || 'resume.pdf';

    if (req.file) {
      const extracted = await parseResumeText(req.file.buffer, req.file.mimetype);
      if (extracted) resumeText = extracted;
    }

    if (!resumeText || resumeText.trim().length < 20) {
      resumeText = `Abhishek Chauhan - B.Tech CSE (2026). Skills: Java, React, Node.js, MongoDB, SQL, DSA. Built E-commerce React web app with REST API backend. Solved 150+ DSA problems. Looking for Software Developer role at TCS.`;
    }

    const analysis = await analyzeResumeContent(resumeText, req.user);
    memoryStore.resumes[userId] = { text: resumeText, analysis, updatedAt: new Date().toISOString() };

    // Save to MongoDB if available
    try {
      await Resume.create({
        userId,
        originalFilename,
        resumeText,
        analysis
      });
    } catch (dbErr) {
      console.warn('[Resume Model Warning] Saved to memory store, MongoDB save bypassed:', dbErr.message);
    }

    const atsScore = analysis.atsScore || analysis.overallScore || 78;
    const updatedProgress = await updateRealUserProgress(
      userId,
      'resume',
      atsScore,
      `Analyzed Resume ATS Compatibility: ${atsScore}/100`,
      'Resume Analyzed'
    );

    res.status(200).json({
      success: true,
      analysis,
      updatedProgress,
      message: 'Resume analyzed successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const rewriteBullet = async (req, res, next) => {
  try {
    const { originalText, targetRole } = req.body;
    if (!originalText) {
      return res.status(400).json({ success: false, message: 'Please provide original bullet text' });
    }
    const improved = await rewriteSingleBullet(originalText, targetRole || req.user.targetRole);
    res.status(200).json({ success: true, original: originalText, improved });
  } catch (error) {
    next(error);
  }
};

export const getResumeAnalysis = async (req, res) => {
  const userId = req.user._id || req.user.id;

  // Check MongoDB first
  try {
    const latestDoc = await Resume.findOne({ userId }).sort({ createdAt: -1 });
    if (latestDoc && latestDoc.analysis) {
      return res.status(200).json({ success: true, analysis: latestDoc.analysis, text: latestDoc.resumeText });
    }
  } catch (e) {
    // Fallthrough to memory store
  }

  const existing = memoryStore.resumes[userId];
  if (existing) {
    return res.status(200).json({ success: true, analysis: existing.analysis, text: existing.text });
  }

  const defaultAnalysis = await analyzeResumeContent('', req.user);
  res.status(200).json({ success: true, analysis: defaultAnalysis });
};
