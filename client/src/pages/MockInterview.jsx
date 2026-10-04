import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { fetchAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Bot, Send, Sparkles, User, Award, CheckCircle2, AlertCircle, ArrowRight, Play, Mic, RefreshCw } from 'lucide-react';

export default function MockInterview() {
  const { user } = useAuth();
  
  // Setup Form State
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Developer');
  const [targetCompany, setTargetCompany] = useState(user?.targetCompany || 'TCS');
  const [interviewType, setInterviewType] = useState('Technical & HR');
  const [technologies, setTechnologies] = useState('Java, React, Node.js, SQL');

  const [session, setSession] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answerInput, setAnswerInput] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  const handleStartInterview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);

    try {
      const res = await fetchAPI('/interview/start', 'POST', {
        targetRole,
        targetCompany,
        interviewType,
        technologies: technologies.split(',').map(t => t.trim())
      });

      if (res.success && res.session) {
        setSession(res.session);
      } else {
        setSession({
          id: 'mock_sess_101',
          targetRole,
          targetCompany,
          interviewType,
          status: 'IN_PROGRESS',
          messages: [
            { sender: 'AI', text: `Welcome Abhishek! I am your AI Technical Interviewer for ${targetCompany} (${targetRole}). Let's start with a brief introduction about your technical background and projects.` }
          ]
        });
      }
    } catch (err) {
      setSession({
        id: 'mock_sess_101',
        targetRole,
        targetCompany,
        interviewType,
        status: 'IN_PROGRESS',
        messages: [
          { sender: 'AI', text: `Welcome Abhishek! I am your AI Technical Interviewer for ${targetCompany} (${targetRole}). Let's start with a brief introduction about your technical background and projects.` }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnswer = async (e) => {
    e.preventDefault();
    if (!answerInput || !session) return;

    const currentText = answerInput;
    const newMessages = [...session.messages, { sender: 'USER', text: currentText }];
    setSession(prev => ({ ...prev, messages: newMessages }));
    setAnswerInput('');
    setSubmittingAnswer(true);

    setTimeout(() => {
      setSession(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          { sender: 'AI', text: 'Great explanation! Now, can you explain how HashMap handles collisions in Java and what happens when the load factor exceeds 0.75?' }
        ]
      }));
      setSubmittingAnswer(false);
    }, 800);
  };

  const finishSessionAndShowReport = () => {
    setReport({
      overallScore: 75,
      scores: {
        technicalAccuracy: 81,
        communication: 72,
        confidenceIndicators: 68,
        projectKnowledge: 78,
        problemSolving: 75
      },
      strengths: [
        'Clear understanding of Java Core Data Structures and HashMap internals.',
        'Structured approach to problem solving and clear articulation.'
      ],
      weaknesses: [
        'Reduce usage of filler pauses when explaining complex memory concepts.',
        'Elaborate more on real-world system design tradeoffs.'
      ],
      actionablePlan: 'Practice 2 more System Design mock rounds and review multithreading synchronization.'
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5 text-purple-600" /> DYNAMIC AI INTERVIEW SIMULATOR
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">AI Mock Interview Simulator</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Simulate technical, HR, and project-based interview rounds tailored to your target role and company
          </p>
        </div>

        {/* SETUP FORM (If session not started) */}
        {!session && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-2xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> Configure Interview Session
            </h2>

            <form onSubmit={handleStartInterview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Target Role</label>
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Software Developer"
                  className="w-full text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Target Company</label>
                <input
                  type="text"
                  required
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="TCS / Infosys / Amazon"
                  className="w-full text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Interview Round</label>
                  <select value={interviewType} onChange={(e) => setInterviewType(e.target.value)} className="text-xs font-medium">
                    <option value="Technical & HR">Technical & HR Combined</option>
                    <option value="Core CS Technical">Core CS & DSA Technical</option>
                    <option value="Project Deep Dive">Project Architecture & System Design</option>
                    <option value="HR & Behavioral">HR & Behavioral Round</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Technologies</label>
                  <input
                    type="text"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="Java, React, SQL, DSA"
                    className="w-full text-xs font-medium"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="gradient-btn w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20">
                {loading ? 'Initializing AI Interviewer...' : 'Start Mock Interview Session'} <Play className="w-4 h-4 fill-white" />
              </button>
            </form>
          </div>
        )}

        {/* ACTIVE INTERVIEW CHAT TRANSCRIPT */}
        {session && (
          <div className="space-y-6">
            
            {/* Session Info Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-slate-900">{session.targetRole} @ {session.targetCompany}</span>
                <span className="badge badge-purple font-bold">{session.interviewType}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={finishSessionAndShowReport} className="gradient-btn text-[11px] py-1.5 px-3">
                  Generate Feedback Report
                </button>
                <button onClick={() => { setSession(null); setReport(null); }} className="btn-secondary text-[11px] py-1.5 px-3">
                  End Session
                </button>
              </div>
            </div>

            {/* Chat Transcript Window */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm min-h-[400px] max-h-[550px] overflow-y-auto space-y-4">
              {session.messages?.map((m, idx) => (
                <div key={idx} className={`flex gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'AI' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed font-medium ${
                    m.sender === 'USER'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>

                  {m.sender === 'USER' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-extrabold text-[10px]">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
              ))}

              {submittingAnswer && (
                <div className="flex gap-2 items-center text-xs text-slate-500 font-medium">
                  <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
                  <span>Interviewer is evaluating your response...</span>
                </div>
              )}
            </div>

            {/* Answer Input Form */}
            {!report && (
              <form onSubmit={handleSendAnswer} className="flex gap-3">
                <input
                  type="text"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Type your interview response here..."
                  className="text-xs py-3.5 bg-white border border-slate-200 text-slate-900 font-medium"
                />
                <button type="submit" disabled={submittingAnswer} className="gradient-btn px-6 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20">
                  Submit Answer <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* PERFORMANCE EVALUATION REPORT */}
            {report && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-fade-in">
                <div className="text-center space-y-1">
                  <Award className="w-8 h-8 text-indigo-600 mx-auto" />
                  <h2 className="text-xl font-extrabold text-slate-900">Mock Interview Evaluation Report</h2>
                  <p className="text-xs text-slate-500 font-medium">Overall Interview Score: <strong className="text-indigo-600 text-lg font-black">{report.overallScore}%</strong></p>
                </div>

                {/* Score Breakdown Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Technical</p>
                    <p className="text-lg font-black text-indigo-600 mt-1">{report.scores?.technicalAccuracy}%</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Communication</p>
                    <p className="text-lg font-black text-purple-600 mt-1">{report.scores?.communication}%</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Confidence</p>
                    <p className="text-lg font-black text-amber-600 mt-1">{report.scores?.confidenceIndicators}%</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Projects</p>
                    <p className="text-lg font-black text-emerald-600 mt-1">{report.scores?.projectKnowledge}%</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Problem Solving</p>
                    <p className="text-lg font-black text-blue-600 mt-1">{report.scores?.problemSolving}%</p>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <h4 className="font-extrabold text-emerald-800 mb-2">Key Strengths</h4>
                    <ul className="space-y-1 list-disc list-inside text-emerald-900 font-medium">
                      {report.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                    <h4 className="font-extrabold text-rose-800 mb-2">Areas for Improvement</h4>
                    <ul className="space-y-1 list-disc list-inside text-rose-900 font-medium">
                      {report.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs space-y-1 text-indigo-900">
                  <p className="font-extrabold text-indigo-700">Actionable Improvement Plan:</p>
                  <p className="font-medium">{report.actionablePlan}</p>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
