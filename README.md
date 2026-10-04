# 🚀 CareerAI — AI-Powered Placement Assistant Platform

> A full-stack placement preparation platform powered by **Google Gemini AI**, designed to help engineering students clear tech interviews, optimize resumes, practice DSA/SQL, take adaptive mock interviews, and generate personalized placement roadmaps.

---

## 🌟 Key Features

* 📄 **Resume AI Engine**: Instant ATS compatibility scoring, technical skill extraction, formatting warning detection, and action-oriented bullet point rewriter.
* 🎯 **Job Match AI**: Compare parsed candidate resumes against target job descriptions for skill gap analysis and compatibility percentages.
* 💻 **DSA & SQL Practice Workspace**: Interactive code runner with progressive AI hints and Big-O time/space complexity analysis.
* 🎙️ **Adaptive AI Mock Interview**: Interactive technical & HR interview rounds with real-time dynamic follow-ups and performance evaluation reports.
* 📚 **RAG Placement Document Assistant**: Retrieval-Augmented Generation pipeline for uploading placement PDFs, notes, and company interview experiences with grounded source attribution.
* 📊 **Aptitude Module**: Timed quantitative, reasoning, and verbal tests with step-by-step AI math solutions.
* 🗺️ **Personalized Placement Roadmap**: Dynamic task generator and streak tracking to boost candidate placement readiness.

---

## 🏗️ Technology Stack

* **Frontend**: React 18, Vite, React Router v6, Lucide Icons, Vanilla CSS
* **Backend**: Node.js, Express.js (ES Modules)
* **Database**: MongoDB / Mongoose (with hybrid stateful memory fallback)
* **AI Router Layer**: Google Gemini REST API (`gemini-1.5-flash`), OpenAI, and Ollama

---

## ⚙️ Quick Start Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/abhii72488/Career-AI.git
cd Career-AI

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Environment Setup
Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/career_ai
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# Primary AI Provider
AI_PROVIDER=gemini
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Run Development Servers
```bash
# Terminal 1: Backend Server (Port 5000)
cd server
npm run dev

# Terminal 2: Frontend Client (Port 5173)
cd client
npm run dev
```

Open `http://localhost:5173` in your browser!
