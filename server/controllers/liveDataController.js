import { liveDataService } from '../services/liveDataService.js';

export const getLiveJobsHandler = async (req, res, next) => {
  try {
    const { q, location } = req.query;
    const jobs = await liveDataService.getLiveJobs(q, location);
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (err) {
    next(err);
  }
};

export const getLiveDSAHandler = async (req, res, next) => {
  try {
    const dsaProblems = await liveDataService.getLiveDSAProblems();
    res.status(200).json({
      success: true,
      count: dsaProblems.length,
      problems: dsaProblems
    });
  } catch (err) {
    next(err);
  }
};

export const getLiveCompaniesHandler = async (req, res, next) => {
  try {
    const companies = await liveDataService.getLiveCompanies();
    res.status(200).json({
      success: true,
      count: companies.length,
      companies
    });
  } catch (err) {
    next(err);
  }
};

export const getLiveInterviewsHandler = async (req, res, next) => {
  try {
    const interviews = await liveDataService.getLiveInterviews();
    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews
    });
  } catch (err) {
    next(err);
  }
};

export const getLiveResourcesHandler = async (req, res, next) => {
  try {
    const resources = await liveDataService.getLiveResources();
    res.status(200).json({
      success: true,
      count: resources.length,
      resources
    });
  } catch (err) {
    next(err);
  }
};

export const getLiveNewsHandler = async (req, res, next) => {
  try {
    const news = await liveDataService.getLiveNews();
    res.status(200).json({
      success: true,
      count: news.length,
      news
    });
  } catch (err) {
    next(err);
  }
};

export const getLiveRecommendationsHandler = async (req, res, next) => {
  try {
    const userProfile = req.user || {
      targetRole: 'Software Developer',
      skills: ['Java', 'React', 'SQL', 'Node.js']
    };
    const recommendations = await liveDataService.getLivePersonalizedRecommendations(userProfile);
    res.status(200).json({
      success: true,
      recommendations
    });
  } catch (err) {
    next(err);
  }
};

export const getSourceHealthHandler = async (req, res, next) => {
  try {
    const sources = await liveDataService.getSourceHealth();
    res.status(200).json({
      success: true,
      count: sources.length,
      sources
    });
  } catch (err) {
    next(err);
  }
};

export const triggerSyncHandler = async (req, res, next) => {
  try {
    await liveDataService.syncAllConnectors();
    const sources = await liveDataService.getSourceHealth();
    res.status(200).json({
      success: true,
      message: 'Background synchronization triggered successfully across all connectors.',
      sources
    });
  } catch (err) {
    next(err);
  }
};
