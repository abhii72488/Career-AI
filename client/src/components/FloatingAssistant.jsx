import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your CareerAI Assistant 👋 How can I help you prepare for your target placement today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const suggestedPrompts = [
    { text: 'What should I study today?', action: 'study' },
    { text: 'Analyze my resume', action: 'resume' },
    { text: 'Find my skill gaps', action: 'job-match' },
    { text: 'Start a mock interview', action: 'interview' },
    { text: 'Prepare me for TCS', action: 'company' }
  ];

  const handleSendPrompt = (promptText, actionKey) => {
    if (!promptText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: promptText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let replyText = '';
      let actionLink = null;

      if (actionKey === 'study' || promptText.includes('study')) {
        replyText = "Based on your current readiness score (72%), today you should focus on Array sliding window problems in DSA and practice SQL JOINs!";
        actionLink = { label: 'Go to Roadmap', path: '/roadmap' };
      } else if (actionKey === 'resume' || promptText.includes('resume')) {
        replyText = "Your Resume ATS Compatibility score is currently 78/100. Adding quantifiable achievements to your projects can boost it to 85%+!";
        actionLink = { label: 'Open Resume AI', path: '/resume-ai' };
      } else if (actionKey === 'job-match' || promptText.includes('skill gap')) {
        replyText = "You have 3 target skill gaps for your Software Developer role: System Design, Advanced SQL, and Spring Boot.";
        actionLink = { label: 'Analyze Job Match', path: '/job-match' };
      } else if (actionKey === 'interview' || promptText.includes('interview')) {
        replyText = "Ready for an AI Mock Interview? I can simulate HR and Technical rounds for TCS, Infosys, and Amazon.";
        actionLink = { label: 'Start Mock Interview', path: '/mock-interview' };
      } else if (actionKey === 'company' || promptText.includes('TCS')) {
        replyText = "TCS Placement Prep: Focus 40% on Aptitude, 30% on Hands-on Coding (Strings/Arrays), and 30% on CS Fundamentals.";
        actionLink = { label: 'View TCS Syllabus', path: '/company-prep' };
      } else {
        replyText = `I have logged your request regarding "${promptText}". CareerAI recommends taking a quick 10-minute diagnostic test to personalize your schedule.`;
        actionLink = { label: 'Go to Dashboard', path: '/dashboard' };
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: replyText, link: actionLink }
      ]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide pr-1">CareerAI Assistant</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col h-[520px]">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-tight">CareerAI Assistant</h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" /> Online • Placement Preparation AI
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-indigo-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-sm font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.link && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(msg.link.path);
                      }}
                      className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[11px] transition-colors border border-indigo-200"
                    >
                      {msg.link.label} <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 text-[10px] font-extrabold">
                    YOU
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" /> AI is thinking...
              </div>
            )}
          </div>

          {/* Quick Prompts Pills */}
          <div className="px-3 py-2 bg-white border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">Suggested Prompts</p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {suggestedPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendPrompt(p.text, p.action)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border border-slate-200 text-slate-600 text-[11px] font-medium transition-all shrink-0"
                >
                  {p.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about placement..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 py-2 px-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
