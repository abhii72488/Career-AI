import express from 'express';
import { getAptitudeQuestions, submitAptitudeAnswers, explainAptitudeQuestion } from '../controllers/aptitudeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/questions', getAptitudeQuestions);
router.post('/submit', protect, submitAptitudeAnswers);
router.post('/explain', protect, explainAptitudeQuestion);

export default router;
