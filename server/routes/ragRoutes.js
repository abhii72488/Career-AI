import express from 'express';
import multer from 'multer';
import { uploadDocument, askRAGQuestion, getUserDocuments } from '../controllers/ragController.js';
import { protect } from '../middleware/auth.js';

const upload = multer({ limits: { fileSize: 15 * 1024 * 1024 } });
const router = express.Router();

router.post('/upload', protect, upload.single('docFile'), uploadDocument);
router.post('/ask', protect, askRAGQuestion);
router.get('/documents', protect, getUserDocuments);

export default router;
