import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { UserPlus, Sparkles, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);

  // Step 1 State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2 State
  const [college, setCollege] = useState('Delhi Technological University');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [targetRole, setTargetRole] = useState('Software Developer');
  const [targetCompany, setTargetCompany] = useState('TCS');
  const [dailyHours, setDailyHours] = useState('4');
  const [skillsText, setSkillsText] = useState('Java, React, Node.js, SQL, Basic DSA');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  // Dynamic Password Strength Calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500 text-rose-600' };
    if (score <= 3) return { score: 65, label: 'Medium', color: 'bg-amber-500 text-amber-600' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500 text-emerald-600' };
  };

  const strength = getPasswordStrength(password);

  const handleNextStep = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill out all identity fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setStep(2);
  };

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const payload = {
      name,
      email,
      password,
      confirmPassword,
      college,
      degree,
      branch,
      graduationYear,
      targetRole,
      targetCompany,
      dailyHours,
      skills: skillsText
    };

    const res = await registerUser(payload);
    setSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 py-12 relative overflow-hidden">
        {/* Soft Background Accent Gradients */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-blue-100/40 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl animate-fade-in space-y-6">
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {step === 1 ? 'Create Candidate Account' : 'Set Placement Goals'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {step === 1 ? 'Step 1 of 2: Basic Identity Credentials' : 'Step 2 of 2: Placement Profile & Target Role'}
              </p>

              {/* Progress Step Bar */}
              <div className="flex items-center gap-2 mt-4 max-w-xs mx-auto">
                <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                {error}
              </div>
            )}

            {/* STEP 1: ACCOUNT CREDENTIALS */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abhishek Chauhan"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abhishek@careerai.dev"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 text-xs font-medium pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-500">Password Strength:</span>
                        <span className={strength.color.split(' ')[1]}>{strength.label}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${strength.color.split(' ')[0]} transition-all duration-300`} style={{ width: `${strength.score}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 text-xs font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="gradient-btn w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all mt-2 cursor-pointer"
                >
                  Continue to Placement Goals <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: PLACEMENT PROFILE ONBOARDING */}
            {step === 2 && (
              <form onSubmit={handleSubmitFinal} className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Degree</label>
                    <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} className="text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Graduation Year</label>
                    <input type="number" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} className="text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">College / University</label>
                  <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className="text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Target Role</label>
                    <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="Software Developer" className="text-xs" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Target Company</label>
                    <input type="text" value={targetCompany} onChange={(e) => setTargetCompany(e.target.value)} placeholder="TCS" className="text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Current Technical Skills</label>
                  <input type="text" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} placeholder="Java, React, SQL, Basic DSA" className="text-xs" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary py-3 px-4 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="gradient-btn flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer"
                  >
                    {submitting ? 'Setting up Profile...' : 'Complete & Launch Dashboard'} <UserPlus className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600 font-medium">
                Already registered?{' '}
                <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
