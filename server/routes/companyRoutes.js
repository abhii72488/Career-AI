import express from 'express';
import { getCompanies, getCompanyBySlug, generateCompanyRoadmap } from '../controllers/companyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCompanies);
router.get('/:slug', getCompanyBySlug);
router.post('/generate-plan', protect, generateCompanyRoadmap);

export default router;
