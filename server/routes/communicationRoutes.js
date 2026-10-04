import express from 'express';
import { polishCommunication } from '../controllers/communicationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/polish', protect, polishCommunication);

export default router;
