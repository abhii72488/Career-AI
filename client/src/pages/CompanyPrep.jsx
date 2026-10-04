import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { fetchAPI } from '../services/api.js';
import { Building2, CheckCircle2, Clock, Calendar, Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function CompanyPrep() {
  const [companies, setCompanies] = useState([
    {
      id: 'c1',
      name: 'TCS',
      category: 'IT Services / Tech',
      logo: '🏢',
      lastUpdated: '2026',
      eligibility: { minCgpa: '6.0', maxBacklogs: 1 },
      selectionStages: [
        { stageName: 'NQT Foundation Round', duration: '75 mins', description: 'Numerical, Verbal, Reasoning Aptitude.', cutoffHint: '65%+ Accuracy' },
        { stageName: 'Advanced Coding Round', duration: '60 mins', description: 'Hands-on Arrays & String manipulation.', cutoffHint: 'Passed 80% test cases' },
        { stageName: 'Technical & HR Interview', duration: '30 mins', description: 'Project architecture, SQL, Java fundamentals.', cutoffHint: 'Clear communication' }
      ],
      importantTopics: {
        aptitude: ['Time & Work', 'Percentages', 'Blood Relations'],
        coding: ['Arrays', 'Strings', 'HashMap'],
        sql: ['INNER JOIN', 'GROUP BY', 'HAVING'],
        technical: ['OOP Principles', 'DBMS Normalization']
      },
      dayPlan: [
        { day: 1, focus: 'Aptitude Speed Tests', tasks: ['Complete 20 Quantitative Aptitude questions', 'Revise Time & Work formulas'] },
        { day: 2, focus: 'Coding & SQL Practice', tasks: ['Solve 3 Array DSA problems', 'Practice SQL JOIN queries'] },
        { day: 3, focus: 'Mock Interview & HR', tasks: ['Complete 1 AI Technical Mock Interview', 'Prepare project summary'] }
      ]
    },
    {
      id: 'c2',
      name: 'Infosys',
      category: 'IT Services / Tech',
      logo: '💼',
      lastUpdated: '2026',
      eligibility: { minCgpa: '6.5', maxBacklogs: 0 },
      selectionStages: [
        { stageName: 'Online Test', duration: '90 mins', description: 'Reasoning, Verbal, Pseudo Code.', cutoffHint: '70%+ Accuracy' },
        { stageName: 'Specialist Programmer Round', duration: '90 mins', description: 'Advanced Dynamic Programming.', cutoffHint: 'Passed 100% test cases' }
      ],
      importantTopics: {
        aptitude: ['Data Interpretation', 'Puzzles'],
        coding: ['DP', 'Graphs', 'Trees'],
        sql: ['Subqueries', 'Indexes'],
        technical: ['Operating Systems', 'System Design']
      },
      dayPlan: [
        { day: 1, focus: 'Pseudo Code & Reasoning', tasks: ['Practice 15 Pseudo Code questions', 'Solve 10 Reasoning puzzles'] },
        { day: 2, focus: 'Advanced DSA', tasks: ['Solve 2 Tree & DP problems', 'Review time complexity'] }
      ]
    }
  ]);
  
  const [activeCompany, setActiveCompany] = useState(companies[0]);
  const [loading, setLoading] = useState(false);

  // Custom Day Plan Generator State
  const [daysAvailable, setDaysAvailable] = useState(7);
  const [customPlan, setCustomPlan] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await fetchAPI('/company');
      if (res.success && res.companies?.length > 0) {
        setCompanies(res.companies);
        setActiveCompany(res.companies[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!activeCompany) return;

    setGenerating(true);
    try {
      const res = await fetchAPI('/company/generate-plan', 'POST', {
        companyName: activeCompany.name,
        daysAvailable
      });

      if (res.success && res.plan) {
        setCustomPlan(res.plan);
      } else {
        setCustomPlan([
          { day: 1, focus: 'Aptitude & Speed Drills', tasks: ['Complete 25 Quantitative & Verbal questions', 'Review formula shortcuts'] },
          { day: 2, focus: 'Coding & SQL Intensive', tasks: ['Solve 3 DSA Array/String problems', 'Practice complex SQL JOINs'] },
          { day: 3, focus: 'AI Mock Interview & Revision', tasks: ['Take 1 AI Mock Technical Interview', 'Review resume project bullets'] }
        ]);
      }
    } catch (err) {
      setCustomPlan([
        { day: 1, focus: 'Aptitude & Speed Drills', tasks: ['Complete 25 Quantitative & Verbal questions', 'Review formula shortcuts'] },
        { day: 2, focus: 'Coding & SQL Intensive', tasks: ['Solve 3 DSA Array/String problems', 'Practice complex SQL JOINs'] },
        { day: 3, focus: 'AI Mock Interview & Revision', tasks: ['Take 1 AI Mock Technical Interview', 'Review resume project bullets'] }
      ]);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-cyan-600" /> HIRING COMPANY INTELLIGENCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Company-Specific Preparation</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Eligibility criteria, selection stages, aptitude patterns, coding topics, and AI day-by-day study schedules
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: COMPANY LIST SELECTOR */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Target Companies</h2>
              <div className="space-y-2">
                {companies.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => { setActiveCompany(c); setCustomPlan(null); }}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                      activeCompany?.id === c.id
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.logo}</span>
                      <div>
                        <p className="font-extrabold text-xs text-slate-900">{c.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{c.category}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: COMPANY DETAILS & CUSTOM ROADMAP */}
          <div className="lg:col-span-8 space-y-6">
            {activeCompany && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Company Title Banner */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{activeCompany.logo}</span>
                    <div>
                      <h2 className="text-xl font-black text-slate-900">{activeCompany.name}</h2>
                      <p className="text-xs text-slate-500 font-medium">{activeCompany.category} • Syllabus Updated {activeCompany.lastUpdated}</p>
                    </div>
                  </div>

                  <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 font-medium">
                    <p>Min CGPA: <strong className="text-emerald-700 font-bold">{activeCompany.eligibility?.minCgpa}</strong></p>
                    <p>Max Backlogs: <strong className="text-amber-700 font-bold">{activeCompany.eligibility?.maxBacklogs}</strong></p>
                  </div>
                </div>

                {/* Selection Process Stages */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Selection Process Stages</h3>
                  <div className="space-y-3">
                    {activeCompany.selectionStages?.map((stage, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900 text-xs">{i+1}. {stage.stageName}</span>
                          <span className="text-[10px] text-slate-500 font-mono font-medium">Duration: {stage.duration}</span>
                        </div>
                        <p className="text-slate-600 font-medium">{stage.description}</p>
                        <p className="text-indigo-600 font-bold text-[11px]">Cutoff Hint: {stage.cutoffHint}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Topics Grid */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Frequently Asked Topics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                      <p className="font-extrabold text-indigo-700 mb-1">Aptitude & Reasoning</p>
                      <p className="text-slate-700 font-medium">{(activeCompany.importantTopics?.aptitude || []).join(', ')}</p>
                    </div>
                    <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <p className="font-extrabold text-emerald-700 mb-1">Coding & DSA</p>
                      <p className="text-slate-700 font-medium">{(activeCompany.importantTopics?.coding || []).join(', ')}</p>
                    </div>
                    <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100">
                      <p className="font-extrabold text-amber-700 mb-1">SQL & Databases</p>
                      <p className="text-slate-700 font-medium">{(activeCompany.importantTopics?.sql || []).join(', ')}</p>
                    </div>
                    <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100">
                      <p className="font-extrabold text-purple-700 mb-1">Technical Core & CS</p>
                      <p className="text-slate-700 font-medium">{(activeCompany.importantTopics?.technical || []).join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Custom Day Plan Generator */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> AI Day-by-Day Preparation Plan
                    </h3>
                    <div className="flex items-center gap-2">
                      <select
                        value={daysAvailable}
                        onChange={(e) => setDaysAvailable(Number(e.target.value))}
                        className="text-xs py-1 px-3 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold"
                      >
                        <option value={3}>3 Days Crash Course</option>
                        <option value={7}>7 Days Standard Prep</option>
                        <option value={14}>14 Days Deep Dive</option>
                      </select>
                      <button onClick={handleGeneratePlan} disabled={generating} className="gradient-btn text-xs py-1.5 px-3 cursor-pointer">
                        {generating ? 'Generating...' : 'Generate Schedule'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(customPlan || activeCompany.dayPlan)?.map((dayItem, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-indigo-700">Day {dayItem.day}: {dayItem.focus}</span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-slate-700 font-medium">
                          {dayItem.tasks?.map((t, tIdx) => <li key={tIdx}>{t}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
