import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ResumeAI from './pages/ResumeAI.jsx';
import JobMatch from './pages/JobMatch.jsx';
import RAGSystem from './pages/RAGSystem.jsx';
import CareerAssistant from './pages/CareerAssistant.jsx';
import DSAPractice from './pages/DSAPractice.jsx';
import SQLPractice from './pages/SQLPractice.jsx';
import AptitudePractice from './pages/AptitudePractice.jsx';
import MockInterview from './pages/MockInterview.jsx';
import CommunicationPractice from './pages/CommunicationPractice.jsx';
import CompanyPrep from './pages/CompanyPrep.jsx';
import Roadmap from './pages/Roadmap.jsx';
import Profile from './pages/Profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume-ai" element={<ResumeAI />} />
          <Route path="/job-match" element={<JobMatch />} />
          <Route path="/rag-docs" element={<RAGSystem />} />
          <Route path="/assistant" element={<CareerAssistant />} />
          <Route path="/dsa" element={<DSAPractice />} />
          <Route path="/sql" element={<SQLPractice />} />
          <Route path="/aptitude" element={<AptitudePractice />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/communication" element={<CommunicationPractice />} />
          <Route path="/company-prep" element={<CompanyPrep />} />
          <Route path="/company/:slug" element={<CompanyPrep />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
