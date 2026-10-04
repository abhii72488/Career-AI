import express from 'express';
import { updateProfile, getActivities } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.put('/', protect, updateProfile);
router.get('/activities', protect, getActivities);

export default router;

