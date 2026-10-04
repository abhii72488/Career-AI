import express from 'express';
import { getSQLProblems, executeSQL } from '../controllers/sqlController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/problems', getSQLProblems);
router.post('/execute', protect, executeSQL);

export default router;
