import express from 'express';
import {
  getLiveJobsHandler,
  getLiveDSAHandler,
  getLiveCompaniesHandler,
  getLiveInterviewsHandler,
  getLiveResourcesHandler,
  getLiveNewsHandler,
  getLiveRecommendationsHandler,
  getSourceHealthHandler,
  triggerSyncHandler
} from '../controllers/liveDataController.js';

const router = express.Router();

router.get('/jobs', getLiveJobsHandler);
router.get('/dsa', getLiveDSAHandler);
router.get('/companies', getLiveCompaniesHandler);
router.get('/interviews', getLiveInterviewsHandler);
router.get('/resources', getLiveResourcesHandler);
router.get('/news', getLiveNewsHandler);
router.get('/recommendations', getLiveRecommendationsHandler);
router.get('/admin/sources', getSourceHealthHandler);
router.post('/admin/sources/sync', triggerSyncHandler);

export default router;
