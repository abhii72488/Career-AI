import express from 'express';
import { getDSAProblems, getDSAProblemById, submitDSASolution, explainDSAProblem, getDSAHint } from '../controllers/dsaController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/problems', getDSAProblems);
router.get('/problems/:id', getDSAProblemById);
router.post('/submit', protect, submitDSASolution);
router.post('/explain', protect, explainDSAProblem);
router.post('/hint', protect, getDSAHint);

export default router;
