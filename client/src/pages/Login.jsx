import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { LogIn, Sparkles, AlertCircle, Eye, EyeOff, UserCheck, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('abhishek@careerai.dev');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e, customEmail = null, customPassword = null) => {
    if (e) e.preventDefault();
    setError('');
    setSubmitting(true);

    const targetEmail = customEmail || email;
    const targetPassword = customPassword || password;

    const res = await loginUser(targetEmail, targetPassword);
    setSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Login failed. Please check credentials.');
    }
  };

  const fillDemoStudent = (e) => {
    e.preventDefault();
    setEmail('abhishek@careerai.dev');
    setPassword('Password123!');
    handleLogin(null, 'abhishek@careerai.dev', 'Password123!');
  };

  const fillDemoAdmin = (e) => {
    e.preventDefault();
    setEmail('admin@careerai.dev');
    setPassword('Password123!');
    handleLogin(null, 'admin@careerai.dev', 'Password123!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 py-12 relative overflow-hidden">
        {/* Soft Background Accent Gradients */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-blue-100/40 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Side Branding */}
          <div className="hidden md:flex md:col-span-6 flex-col justify-between space-y-6 p-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Placement Assistant SaaS</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
                Your AI-powered placement journey starts here.
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Join thousands of engineering students tracking their readiness, solving DSA & SQL, and cracking interviews at TCS, Infosys, and Amazon.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                'Instant Resume ATS Compatibility Diagnostics',
                'Live In-Browser Code Sandboxes (DSA & SQL)',
                'Adaptive AI Voice & Technical Mock Interviews',
                'Target Role Skill Gap Analysis'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Card Form */}
          <div className="md:col-span-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome 👋</h2>
                <p className="text-xs text-slate-500 mt-1">Sign in to access your CareerAI placement suite</p>
              </div>

              {/* One-Click Demo Access Bar */}
              <div className="mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-[10px] font-extrabold text-slate-500 mb-2 text-center uppercase tracking-wider">
                  ⚡ Quick Demo Accounts
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={fillDemoStudent}
                    className="px-3 py-2 text-xs font-bold rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                    Demo Student
                  </button>
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className="px-3 py-2 text-xs font-bold rounded-xl bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    Demo Admin
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 text-xs font-medium transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
                    <span className="text-xs text-indigo-600 hover:underline cursor-pointer font-bold">Forgot password?</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 text-xs font-medium transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-xs text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span>Remember me</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="gradient-btn w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all mt-2 cursor-pointer"
                >
                  {submitting ? 'Signing In...' : 'Sign In to Dashboard'} <LogIn className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600 font-medium">
                  Don't have an account yet?{' '}
                  <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create account</Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
