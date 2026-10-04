import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { fetchAPI } from '../services/api.js';
import { Mic, Sparkles, CheckCircle2, RefreshCw, Volume2, ArrowRight } from 'lucide-react';

export default function CommunicationPractice() {
  const [userText, setUserText] = useState('My strength is I am hard working and ready to learn new things.');
  const [analysis, setAnalysis] = useState({
    confidenceScore: 85,
    improved: '"My primary strength lies in my strong work ethic and proactive aptitude for acquiring new technical skills quickly."',
    grammarCorrection: 'Replaced repetitive phrasing ("hard working") with precise professional vocabulary ("proactive aptitude").',
    vocabularySuggestions: ['Proactive aptitude', 'Technical adaptability', 'Strong work ethic'],
    keyTakeaway: 'Focus on replacing simple descriptors with actionable professional terminology.'
  });
  const [loading, setLoading] = useState(false);

  const handlePolish = async (e) => {
    e.preventDefault();
    if (!userText) return;

    setLoading(true);
    try {
      const res = await fetchAPI('/communication/polish', 'POST', { userSpeechText: userText });
      if (res.success && res.analysis) {
        setAnalysis(res.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <Mic className="w-3.5 h-3.5 text-rose-600" /> ENGLISH COMMUNICATION COACH
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Communication Practice</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Refine spoken English, eliminate informal phrasing, and polish interview responses into natural professional speech
          </p>
        </div>

        {/* INPUT FORM */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">Spoken / Written Response</label>
          <textarea
            rows={4}
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Type your interview response here (e.g. My strength is I am hard working...)"
            className="text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-900 font-medium focus:bg-white"
          />

          <button
            onClick={handlePolish}
            disabled={loading}
            className="gradient-btn w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20"
          >
            {loading ? 'Polishing Sentence Structure...' : 'Polish Communication & Grammar'} <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* ANALYSIS RESULT */}
        {analysis && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Communication Feedback
              </h3>
              <span className="badge badge-purple text-xs font-bold">
                Confidence Rating: {analysis.confidenceScore || 85}%
              </span>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">Polished Natural Phrasing</span>
              <p className="text-xs font-bold text-slate-900 mt-1 leading-relaxed">{analysis.improved}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs font-medium text-slate-700">
              <p><strong className="text-indigo-700 font-bold">Grammar Correction:</strong> {analysis.grammarCorrection}</p>
              <p><strong className="text-purple-700 font-bold">Vocabulary Enhancements:</strong> {(analysis.vocabularySuggestions || []).join(', ')}</p>
              <p><strong className="text-amber-700 font-bold">Key Takeaway:</strong> {analysis.keyTakeaway}</p>
            </div>
          </div>
        )}

      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
