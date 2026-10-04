import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import {
  Sparkles, ArrowRight, CheckCircle2, FileText, Target, Bot, Code, Database, Brain,
  Building2, Flame, Award, Zap, Check, AlertTriangle, XCircle, Mic, Play, Layers,
  ChevronRight, BarChart3, Star, ShieldCheck, UserCheck, Compass
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: 'Resume AI',
      desc: 'Analyze your resume, identify weaknesses, and get actionable improvement suggestions.',
      bg: 'bg-purple-50 text-purple-600 border-purple-100',
      path: '/resume-ai'
    },
    {
      icon: Target,
      title: 'Job Match',
      desc: 'Compare your profile against any job description and pinpoint critical missing skills.',
      bg: 'bg-blue-50 text-blue-600 border-blue-100',
      path: '/job-match'
    },
    {
      icon: Code,
      title: 'DSA Practice',
      desc: 'Master 100+ curated Data Structures & Algorithms problems with interactive test cases.',
      bg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      path: '/dsa'
    },
    {
      icon: Database,
      title: 'SQL Practice',
      desc: 'Solve real database query challenges with live in-browser SQL execution sandboxes.',
      bg: 'bg-amber-50 text-amber-600 border-amber-100',
      path: '/sql'
    },
    {
      icon: Brain,
      title: 'Aptitude Practice',
      desc: 'Sharpen Quantitative, Logical, and Verbal skills with company-specific timed tests.',
      bg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      path: '/aptitude'
    },
    {
      icon: Bot,
      title: 'AI Mock Interview',
      desc: 'Simulate realistic HR & Technical interviews with real-time feedback on confidence & clarity.',
      bg: 'bg-rose-50 text-rose-600 border-rose-100',
      path: '/mock-interview'
    },
    {
      icon: Building2,
      title: 'Company Preparation',
      desc: 'Targeted preparation roadmaps for TCS, Infosys, Accenture, Wipro, and top MNCs.',
      bg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      path: '/company-prep'
    },
    {
      icon: Layers,
      title: 'Career Roadmap',
      desc: 'Follow a personalized step-by-step daily study schedule designed for your goal.',
      bg: 'bg-teal-50 text-teal-600 border-teal-100',
      path: '/roadmap'
    }
  ];

  const steps = [
    { num: '01', title: 'Upload Resume', text: 'Upload your PDF resume to generate your instant CareerAI compatibility score and extract key skills.' },
    { num: '02', title: 'Analyze Skills', text: 'Discover skill gaps against your target role (e.g. Software Engineer at TCS or Infosys).' },
    { num: '03', title: 'Practice & Improve', text: 'Complete daily recommended DSA, SQL, Aptitude modules and take adaptive AI mock interviews.' },
    { num: '04', title: 'Become Placement Ready', text: 'Boost your readiness score above 85% and apply with total confidence to top campus recruiters.' }
  ];

  const targetCompanies = [
    { name: 'TCS', role: 'Digital & Ninja', readiness: 72, aptitude: true, coding: true, sql: 'warn', interview: false },
    { name: 'Infosys', role: 'Specialist Programmer', readiness: 68, aptitude: true, coding: true, sql: true, interview: false },
    { name: 'Accenture', role: 'Advanced ASE', readiness: 81, aptitude: true, coding: true, sql: true, interview: true },
    { name: 'Cognizant', role: 'GenC Next', readiness: 75, aptitude: true, coding: true, sql: 'warn', interview: false },
    { name: 'Wipro', role: 'Project Engineer', readiness: 79, aptitude: true, coding: true, sql: true, interview: false },
    { name: 'Capgemini', role: 'Senior Analyst', readiness: 85, aptitude: true, coding: true, sql: true, interview: true }
  ];

  const roadmapNodes = [
    { name: 'Foundation', status: 'completed' },
    { name: 'DSA', status: 'completed' },
    { name: 'Development', status: 'completed' },
    { name: 'SQL', status: 'current' },
    { name: 'Interview', status: 'upcoming' },
    { name: 'Company Preparation', status: 'upcoming' },
    { name: 'Placement Ready', status: 'upcoming' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans relative selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      {/* ================================================== */}
      {/* HERO SECTION */}
      {/* ================================================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 border-b border-slate-200/60">
        {/* Soft Decorative Ambient Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-blue-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold shadow-2xs animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>✦ AI-Powered Placement Assistant</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Prepare Smarter.<br />
                <span className="gradient-text">Get Placement Ready.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Analyze your resume, discover skill gaps, practice interviews, solve DSA problems, and prepare for your dream company with AI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/register"
                  className="gradient-btn w-full sm:w-auto px-7 py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 group"
                >
                  Start Preparing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="btn-secondary w-full sm:w-auto px-7 py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                >
                  Explore Features
                </a>
              </div>

              {/* Social Proof Pills */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Student Approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>Personalized Roadmaps</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Mockup */}
            <div className="lg:col-span-6 relative">
              {/* Floating Dashboard Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl p-6 relative z-10 transition-all hover:shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black">
                      CA
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">CareerAI Dashboard</h4>
                      <p className="text-[10px] text-slate-500">Student Profile: Abhishek Chauhan</p>
                    </div>
                  </div>
                  <span className="badge badge-indigo text-[10px]">Active Prep</span>
                </div>

                {/* Main Progress Block */}
                <div className="bg-gradient-to-r from-slate-50 to-indigo-50/40 p-4 rounded-xl border border-slate-200/70 mb-5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Placement Readiness</span>
                    <h3 className="text-3xl font-black text-slate-900 mt-0.5">78%</h3>
                    <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUpIcon className="w-3.5 h-3.5" /> +14% this week
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-600 border-t-purple-500 border-r-indigo-400 flex items-center justify-center bg-white shadow-sm font-black text-xs text-indigo-600">
                    78%
                  </div>
                </div>

                {/* Sub Score Bars */}
                <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Resume</span>
                      <span className="text-indigo-600">85%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>DSA</span>
                      <span className="text-indigo-600">68%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>SQL</span>
                      <span className="text-indigo-600">72%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span>Interview</span>
                      <span className="text-indigo-600">74%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '74%' }} />
                    </div>
                  </div>
                </div>

                {/* Today's Goal */}
                <div className="border-t border-slate-100 pt-3.5">
                  <p className="text-xs font-extrabold text-slate-800 mb-2">Today's Goal</p>
                  <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Solve 2 DSA problems</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Complete SQL practice</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 ml-0.5 shrink-0" />
                      <span>Mock interview</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Badges around Dashboard */}
              <div className="hidden sm:flex absolute -top-5 -left-6 z-20 bg-white border border-slate-200 rounded-xl shadow-lg p-3 items-center gap-3 animate-float">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  85
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">ATS Compatibility</p>
                  <p className="text-xs font-bold text-slate-900">Resume Score 85</p>
                </div>
              </div>

              <div className="hidden sm:flex absolute top-1/2 -right-8 z-20 bg-white border border-slate-200 rounded-xl shadow-lg p-3 items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Priority Gaps</p>
                  <p className="text-xs font-bold text-slate-900">3 Skills to Improve</p>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-6 left-8 z-20 bg-white border border-slate-200 rounded-xl shadow-lg p-2.5 px-3.5 items-center gap-2.5 animate-float" style={{ animationDelay: '3s' }}>
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-extrabold text-slate-900">🔥 7 Day Streak</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURE SECTION */}
      {/* ================================================== */}
      <section id="features" className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge badge-purple text-xs font-bold mb-3">Complete Placement Suite</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Get Placement Ready
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            One intelligent platform for your complete placement preparation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const IconComp = f.icon;
            return (
              <Link
                key={i}
                to={f.path}
                className="light-card p-6 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${f.bg} group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {f.desc}
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  Explore Module <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================================================== */}
      {/* HOW IT WORKS */}
      {/* ================================================== */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-100/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="badge badge-indigo text-xs font-bold mb-3">Structured Methodology</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">How CareerAI Works</h2>
            <p className="text-slate-600 text-sm mt-3">From baseline candidate profile evaluation to placement-ready candidate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center border border-indigo-100 mb-4">
                  {s.num}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* RESUME AI SHOWCASE SECTION */}
      {/* ================================================== */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="badge badge-purple text-xs font-bold">Resume AI Analysis</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Turn Your Resume Into Your Career Advantage
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload your PDF resume to extract key skills, identify missing keywords, and re-write weak bullet points to match ATS standards.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Instant Resume Compatibility Score (0-100)',
                'Automated Skill & Tech Stack Detection',
                'Quantifiable Project Impact Rewriter',
                'Target Role Keyword Recommendations',
                'Section-by-Section Actionable Suggestions'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/resume-ai" className="gradient-btn inline-flex items-center gap-2 text-xs py-3 px-6">
                Analyze My Resume <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Resume AI Diagnostic</h4>
                    <p className="text-xs text-slate-500">File: Abhishek_Chauhan_Resume.pdf</p>
                  </div>
                </div>
                <span className="badge badge-emerald font-bold">82 / 100 ATS Score</span>
              </div>

              {/* Progress Gauges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Resume Score</p>
                  <p className="text-xl font-black text-indigo-600 mt-0.5">82/100</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Skills Match</p>
                  <p className="text-xl font-black text-purple-600 mt-0.5">91%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Projects Impact</p>
                  <p className="text-xl font-black text-blue-600 mt-0.5">78%</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Keywords</p>
                  <p className="text-xl font-black text-emerald-600 mt-0.5">74%</p>
                </div>
              </div>

              {/* AI Recommendation Box */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-purple-900">AI Rewriter Suggestion</h5>
                    <p className="text-xs text-purple-800 mt-1 font-medium leading-relaxed">
                      "Add measurable impact to your project descriptions (e.g., 'Optimized database query performance by 40% using indexing')."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* JOB MATCH SECTION */}
      {/* ================================================== */}
      <section className="py-20 px-4 bg-slate-100/50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Mockup */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Candidate Profile vs Job Description</h4>
                    <p className="text-xs text-slate-500">Target: Software Developer @ TCS</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-black">
                    78% Match
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { name: 'Java Programming', status: 'match', label: '✓ Matched' },
                    { name: 'React.js & Frontend', status: 'match', label: '✓ Matched' },
                    { name: 'SQL & Database Queries', status: 'match', label: '✓ Matched' },
                    { name: 'Node.js Backend API', status: 'match', label: '✓ Matched' },
                    { name: 'Spring Boot Framework', status: 'warn', label: '⚠ Needs Improvement' },
                    { name: 'System Design Basics', status: 'missing', label: '✕ Missing Skill' }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-slate-800">{skill.name}</span>
                      <span className={`font-extrabold px-2.5 py-0.5 rounded-md text-[11px] ${
                        skill.status === 'match' ? 'bg-emerald-100 text-emerald-700' :
                        skill.status === 'warn' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {skill.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900 font-bold">
                  <span>Skill Gap Alert: 3 skills need improvement prior to interview</span>
                  <Link to="/job-match" className="text-indigo-600 hover:underline">View Roadmap →</Link>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <span className="badge badge-blue text-xs font-bold">Job Match Analysis</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Know Exactly What Skills You Are Missing
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Paste any job description from LinkedIn or campus placements. CareerAI instantly extracts requirements and highlights your exact match score and skill gaps.
              </p>
              <div className="pt-2">
                <Link to="/job-match" className="btn-secondary inline-flex items-center gap-2 text-xs py-3 px-6 font-bold">
                  Run Job Match Analysis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* AI INTERVIEW SECTION */}
      {/* ================================================== */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="badge badge-rose text-xs font-bold">AI Mock Interview Simulator</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Practice Real Interviews With Instant AI Feedback
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Experience dynamic AI voice/text interviews. Get immediate breakdowns on technical accuracy, clarity, confidence, and filler word usage.
            </p>
            <div className="pt-2">
              <Link to="/mock-interview" className="gradient-btn inline-flex items-center gap-2 text-xs py-3 px-6">
                Start Mock Interview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-slate-900">Live AI Technical Interview (TCS Round 1)</span>
                </div>
                <span className="badge badge-indigo">Voice Simulator Active</span>
              </div>

              {/* Dialogue Transcript Simulation */}
              <div className="space-y-3 text-xs mb-5">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-950">
                  <p className="font-extrabold text-indigo-700 mb-0.5">AI Interviewer:</p>
                  <p>"Tell me about yourself and explain how HashMap handles collisions in Java."</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800">
                  <p className="font-extrabold text-slate-900 mb-0.5">Candidate Response:</p>
                  <p>"I am a final-year CS student. In Java, HashMap handles collisions using separate chaining with linked lists, and transforms to red-black trees in Java 8..."</p>
                </div>
              </div>

              {/* Real-Time AI Feedback Scorecard */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-extrabold text-slate-800 mb-3">AI Evaluation Breakdown</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Communication</p>
                    <p className="text-lg font-black text-indigo-600">72%</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Technical</p>
                    <p className="text-lg font-black text-emerald-600">81%</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Confidence</p>
                    <p className="text-lg font-black text-purple-600">68%</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Overall Score</p>
                    <p className="text-lg font-black text-blue-600">75%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* COMPANY PREPARATION */}
      {/* ================================================== */}
      <section className="py-20 px-4 bg-slate-100/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge badge-indigo text-xs font-bold mb-3">Target Recruiters</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Company-Specific Preparation</h2>
            <p className="text-slate-600 text-sm mt-3">Tailored syllabi, eligibility thresholds, and daily schedules for top hiring MNCs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetCompanies.map((c, i) => (
              <div key={i} className="light-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">{c.name}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{c.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Prep Level</p>
                      <p className="text-lg font-black text-slate-900">{c.readiness}%</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6 text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Aptitude ✓</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Coding ✓</span>
                    <span className={`px-2 py-0.5 rounded ${c.sql === 'warn' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                      SQL {c.sql === 'warn' ? '⚠' : '✓'}
                    </span>
                    <span className={`px-2 py-0.5 rounded ${c.interview ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                      Interview {c.interview ? '✓' : '○'}
                    </span>
                  </div>
                </div>

                <Link to="/company-prep" className="btn-secondary w-full text-center text-xs py-2.5 font-bold hover:text-indigo-600">
                  Continue Preparation →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* ROADMAP SECTION */}
      {/* ================================================== */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge badge-emerald text-xs font-bold mb-3">Structured Career Track</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Your Placement Roadmap</h2>
          <p className="text-slate-600 text-sm mt-3">Visual progress tracker guiding you from baseline skills to placement ready</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
          {roadmapNodes.map((node, i) => (
            <React.Fragment key={i}>
              <div
                className={`px-4 py-3 rounded-2xl text-xs font-extrabold border shadow-2xs flex items-center gap-2 ${
                  node.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : node.status === 'current'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-md'
                    : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                {node.status === 'completed' && <Check className="w-4 h-4 text-emerald-600" />}
                {node.status === 'current' && <Sparkles className="w-4 h-4 text-white animate-spin" />}
                <span>{node.name}</span>
              </div>
              {i < roadmapNodes.length - 1 && (
                <span className="text-slate-300 font-bold hidden sm:inline">↓</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Floating AI Assistant Widget */}
      <FloatingAssistant />

      <Footer />
    </div>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 0 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.94" />
    </svg>
  );
}
