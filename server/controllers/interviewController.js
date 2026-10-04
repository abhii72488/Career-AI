import { startInterviewSession, submitInterviewAnswer } from '../services/interviewService.js';
import { memoryStore } from '../utils/memoryStore.js';

export const startInterview = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { targetRole, targetCompany, interviewType, technologies } = req.body;

    const session = await startInterviewSession(
      userId,
      targetRole || req.user.targetRole || 'Software Developer',
      targetCompany || req.user.targetCompany || 'TCS',
      interviewType || 'Technical & HR',
      technologies || req.user.skills || ['Java', 'React', 'SQL']
    );

    res.status(201).json({ success: true, session });
  } catch (error) {
    next(error);
  }
};

export const answerInterviewQuestion = async (req, res, next) => {
  try {
    const { sessionId, answerText } = req.body;

    if (!sessionId || !answerText) {
      return res.status(400).json({ success: false, message: 'sessionId and answerText are required.' });
    }

    const result = await submitInterviewAnswer(sessionId, answerText);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getUserInterviews = async (req, res) => {
  const userId = req.user._id || req.user.id;
  const userInterviews = memoryStore.interviews.filter(i => i.userId === userId);
  res.status(200).json({ success: true, interviews: userInterviews });
};
