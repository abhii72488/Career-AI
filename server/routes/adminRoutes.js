import express from 'express';
import { getAdminStats, addDSAProblemAdmin, addAptitudeQuestionAdmin } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getAdminStats);
router.post('/dsa', protect, adminOnly, addDSAProblemAdmin);
router.post('/aptitude', protect, adminOnly, addAptitudeQuestionAdmin);

export default router;
