import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 text-lg font-extrabold text-slate-900">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-sm">
            <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <span>CAREER<span className="gradient-text">AI</span></span>
        </div>
        
        <p className="text-xs text-slate-500 text-center font-medium">
          © 2026 CareerAI Platform. Built for engineering placement preparation & career acceleration.
        </p>

        <div className="flex items-center gap-5 text-xs font-semibold text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <a href="/#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="/#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
          <Link to="/dsa" className="hover:text-indigo-600 transition-colors">DSA Practice</Link>
          <Link to="/company-prep" className="hover:text-indigo-600 transition-colors">Companies</Link>
        </div>
      </div>
    </footer>
  );
}
