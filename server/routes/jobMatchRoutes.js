import express from 'express';
import { analyzeJobDescription } from '../controllers/jobMatchController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', protect, analyzeJobDescription);

export default router;
