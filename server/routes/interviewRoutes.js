import express from 'express';
import { startInterview, answerInterviewQuestion, getUserInterviews } from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/start', protect, startInterview);
router.post('/respond', protect, answerInterviewQuestion);
router.get('/', protect, getUserInterviews);

export default router;
