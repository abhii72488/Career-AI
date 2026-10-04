import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { fetchAPI } from '../services/api.js';
import { Brain, Clock, CheckCircle2, XCircle, ArrowRight, RefreshCw, Award } from 'lucide-react';

export default function AptitudePractice() {
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      category: 'Quantitative',
      topic: 'Time & Work',
      question: 'A can complete a task in 12 days and B can complete the same task in 18 days. If they work together for 4 days, what fraction of the work is remaining?',
      options: ['4/9', '5/9', '1/3', '2/9'],
      correctIndex: 0,
      explanation: 'A\'s 1 day work = 1/12, B\'s 1 day work = 1/18. Combined 1 day = 5/36. In 4 days = 20/36 = 5/9 work done. Remaining = 1 - 5/9 = 4/9.',
      companyTag: ['TCS', 'Infosys']
    },
    {
      id: 'q2',
      category: 'Reasoning',
      topic: 'Blood Relations',
      question: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
      options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
      correctIndex: 1,
      explanation: '"My father\'s son" with no siblings refers to himself. Thus "that man\'s father" is himself, making it his son\'s photograph.',
      companyTag: ['Accenture', 'Wipro']
    },
    {
      id: 'q3',
      category: 'Quantitative',
      topic: 'Probability',
      question: 'Two dice are rolled simultaneously. What is the probability that the sum of the numbers rolled is 8?',
      options: ['5/36', '1/6', '7/36', '1/9'],
      correctIndex: 0,
      explanation: 'Favorable pairs summing to 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 pairs out of 36 outcomes = 5/36.',
      companyTag: ['Cognizant']
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('All');
  
  // Test State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, [category]);

  const loadQuestions = async () => {
    try {
      const res = await fetchAPI(`/aptitude/questions?category=${category}`);
      if (res.success && res.questions?.length > 0) {
        setQuestions(res.questions);
        setSelectedAnswers({});
        setSubmitted(false);
        setScoreReport(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitTest = async () => {
    const answersArray = Object.keys(selectedAnswers).map(qId => ({
      questionId: qId,
      selectedIndex: selectedAnswers[qId]
    }));

    if (answersArray.length === 0) return;

    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    setSubmitted(true);
    setScoreReport({
      correctCount,
      totalQuestions: questions.length,
      accuracy: Math.round((correctCount / questions.length) * 100)
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
              <Brain className="w-3.5 h-3.5 text-emerald-600" /> REASONING & QUANT TEST ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Aptitude Practice Module</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Quantitative Aptitude, Logical Reasoning, and English Verbal timed assessments with step-by-step solutions
            </p>
          </div>

          <button onClick={loadQuestions} className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer font-bold">
            <RefreshCw className="w-3.5 h-3.5" /> Reset Test
          </button>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2">
          {['All', 'Quantitative', 'Reasoning', 'English'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                category === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SCORE REPORT BANNER */}
        {submitted && scoreReport && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 animate-fade-in shadow-sm">
            <Award className="w-8 h-8 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-extrabold text-slate-900">Assessment Completed!</h2>
            <p className="text-xs text-slate-700 font-semibold">
              Score: <strong className="text-emerald-700 font-black">{scoreReport.correctCount} / {scoreReport.totalQuestions}</strong> ({scoreReport.accuracy}% Accuracy)
            </p>
          </div>
        )}

        {/* QUESTIONS LIST */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs font-semibold">Loading Aptitude Question Bank...</div>
          ) : (
            questions.map((q, idx) => {
              const isSelected = selectedAnswers[q.id] !== undefined;
              return (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-400">Question {idx + 1} ({q.category} • {q.topic})</span>
                    <div className="flex gap-1.5">
                      {q.companyTag?.map((t, i) => (
                        <span key={i} className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => {
                      const selected = selectedAnswers[q.id] === oIdx;
                      const isCorrectOpt = q.correctIndex === oIdx;

                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                      if (selected) btnStyle = 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold';
                      if (submitted) {
                        if (isCorrectOpt) btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                        else if (selected && !isCorrectOpt) btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`p-3.5 rounded-xl border text-xs text-left transition-all flex items-center gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white border border-slate-200 font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="font-medium">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <p className="font-extrabold text-indigo-700">Solution & Explanation:</p>
                      <p className="font-medium leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {!submitted && questions.length > 0 && (
          <button onClick={handleSubmitTest} className="gradient-btn w-full py-4 text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer">
            Submit Aptitude Test & View Solutions
          </button>
        )}

      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
