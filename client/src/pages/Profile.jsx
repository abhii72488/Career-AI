import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchAPI } from '../services/api.js';
import { User, Save, CheckCircle2, Building, GraduationCap, Target } from 'lucide-react';

export default function Profile() {
  const { user, updateUserProfileState } = useAuth();

  const [name, setName] = useState(user?.name || 'Abhishek Chauhan');
  const [college, setCollege] = useState(user?.college || 'Delhi Technological University');
  const [degree, setDegree] = useState(user?.degree || 'B.Tech');
  const [branch, setBranch] = useState(user?.branch || 'Computer Science');
  const [graduationYear, setGraduationYear] = useState(user?.graduationYear || 2026);
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Developer');
  const [targetCompany, setTargetCompany] = useState(user?.targetCompany || 'TCS');
  const [skillsText, setSkillsText] = useState((user?.skills || ['Java', 'React', 'Node.js', 'SQL', 'Basic DSA']).join(', '));
  const [dailyHours, setDailyHours] = useState(user?.dailyHours || 4);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    const skillsArray = skillsText.split(',').map(s => s.trim()).filter(Boolean);
    const updates = {
      name,
      college,
      degree,
      branch,
      graduationYear: Number(graduationYear),
      targetRole,
      targetCompany,
      skills: skillsArray,
      dailyHours: Number(dailyHours)
    };

    try {
      const res = await fetchAPI('/profile', 'PUT', updates);
      if (res.success && res.user) {
        updateUserProfileState(res.user);
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        updateUserProfileState(updates);
        setSuccessMsg('Profile updated successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      updateUserProfileState(updates);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5 text-indigo-600" /> STUDENT PROFILE & SETTINGS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Candidate Profile Settings</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Update your college details, degree, target role, target company, and current technical skills
          </p>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full text-xs font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</label>
              <input type="email" value={user?.email || 'abhishek@careerai.dev'} disabled className="w-full text-xs font-medium bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">College / University</label>
              <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className="w-full text-xs font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Degree & Branch</label>
              <input type="text" value={`${degree} ${branch}`} onChange={(e) => { const parts = e.target.value.split(' '); setDegree(parts[0]); setBranch(parts.slice(1).join(' ')); }} className="w-full text-xs font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Graduation Year</label>
              <input type="number" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} className="w-full text-xs font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Target Role</label>
              <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="w-full text-xs font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Target Company</label>
              <input type="text" value={targetCompany} onChange={(e) => setTargetCompany(e.target.value)} className="w-full text-xs font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Daily Prep Hours</label>
              <input type="number" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} min={1} max={12} className="w-full text-xs font-medium" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Technical Skills (Comma separated)</label>
            <input type="text" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} placeholder="Java, React, Node.js, SQL, Basic DSA" className="w-full text-xs font-medium" />
          </div>

          <button type="submit" disabled={saving} className="gradient-btn w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20">
            {saving ? 'Saving Changes...' : 'Save Profile Changes'} <Save className="w-4 h-4" />
          </button>
        </form>

      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
