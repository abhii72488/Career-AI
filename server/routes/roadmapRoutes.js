import express from 'express';
import { getRoadmapTasks, toggleTaskCompletion, addCustomTask, generateAIRoadmap } from '../controllers/roadmapController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/tasks', protect, getRoadmapTasks);
router.post('/generate', protect, generateAIRoadmap);
router.put('/tasks/:taskId/toggle', protect, toggleTaskCompletion);
router.post('/tasks', protect, addCustomTask);

export default router;
