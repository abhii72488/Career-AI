import express from 'express';
import multer from 'multer';
import { analyzeResume, rewriteBullet, getResumeAnalysis } from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit
const router = express.Router();

router.post('/analyze', protect, upload.single('resumeFile'), analyzeResume);
router.post('/rewrite-bullet', protect, rewriteBullet);
router.get('/', protect, getResumeAnalysis);

export default router;
