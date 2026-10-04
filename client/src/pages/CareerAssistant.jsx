import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { fetchAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Bot, Send, Sparkles, User, HelpCircle } from 'lucide-react';

export default function CareerAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'AI',
      text: `Hello ${user?.name || 'Abhishek'}! I am your CareerAI Personal Placement Mentor. I am aware of your candidate profile (Target: ${user?.targetRole || 'Software Developer'} at ${user?.targetCompany || 'TCS'}). How can I help accelerate your preparation today?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const presetQuestions = [
    "What should I study today?",
    "What skills am I missing for a Java developer role?",
    "Why am I failing DSA interviews?",
    "Create a 30-day placement plan."
  ];

  const handleSendMessage = async (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q || q.trim().length === 0) return;

    const userMsg = { sender: 'USER', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetchAPI('/assistant/ask', 'POST', { question: q });
      if (res.success && res.answer) {
        setMessages(prev => [...prev, { sender: 'AI', text: res.answer }]);
      } else {
        setMessages(prev => [...prev, { sender: 'AI', text: `Based on your target role (${user?.targetRole || 'Software Developer'}), focus 40% of your time on Arrays & Strings in DSA, 30% on SQL JOINs, and 30% on taking AI Mock Technical Interviews.` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'AI', text: `Based on your target role (${user?.targetRole || 'Software Developer'}), focus 40% of your time on Arrays & Strings in DSA, 30% on SQL JOINs, and 30% on taking AI Mock Technical Interviews.` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5 text-indigo-600" /> CONTEXT-AWARE AI MENTOR
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">AI Career Assistant</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Ask personalized questions regarding your resume, skill gaps, study schedules, and interview prep
          </p>
        </div>

        {/* PRESET PROMPTS */}
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-indigo-300 text-xs font-bold text-slate-700 hover:text-indigo-600 shadow-2xs transition-all cursor-pointer"
            >
              💡 {q}
            </button>
          ))}
        </div>

        {/* CHAT MESSAGES WINDOW */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-1 min-h-[450px] max-h-[600px] overflow-y-auto space-y-4">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`flex gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'AI' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed font-medium whitespace-pre-line ${
                  m.sender === 'USER'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'USER' && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-extrabold text-[10px]">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-slate-500 font-medium">
              <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>CareerAI is analyzing your candidate profile and crafting an answer...</span>
            </div>
          )}
        </div>

        {/* CHAT INPUT FORM */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask CareerAI anything about your placement preparation..."
            className="text-xs py-3.5 bg-white border border-slate-200 text-slate-900 font-medium"
          />
          <button type="submit" disabled={loading} className="gradient-btn px-6 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20">
            Send <Send className="w-4 h-4" />
          </button>
        </form>

      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
