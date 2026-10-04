import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { env, validateEnv } from './config/env.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { securityHeaders } from './middleware/security.js';
import { liveDataService } from './services/liveDataService.js';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import jobMatchRoutes from './routes/jobMatchRoutes.js';
import ragRoutes from './routes/ragRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';
import dsaRoutes from './routes/dsaRoutes.js';
import aptitudeRoutes from './routes/aptitudeRoutes.js';
import sqlRoutes from './routes/sqlRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import communicationRoutes from './routes/communicationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import liveDataRoutes from './routes/liveDataRoutes.js';

dotenv.config();
validateEnv();

const app = express();
const PORT = env.PORT;

// Connect Database (with automatic graceful fallback)
connectDB();

// Middleware
app.use(securityHeaders);
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'CareerAI Live-Data Engine',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/job-match', jobMatchRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/aptitude', aptitudeRoutes);
app.use('/api/sql', sqlRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/live', liveDataRoutes);

// Central Error Handler
app.use(errorHandler);

// Start Background Live Connectors Sync
liveDataService.startBackgroundSync();

app.listen(PORT, () => {
  console.log(`🚀 CareerAI Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
