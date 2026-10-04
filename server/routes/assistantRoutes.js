import express from 'express';
import { askCareerAssistant } from '../controllers/assistantController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/ask', protect, askCareerAssistant);

export default router;
