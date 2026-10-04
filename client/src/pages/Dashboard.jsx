import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ReadinessRing from '../components/ReadinessRing.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchAPI } from '../services/api.js';
import {
  FileText, Target, Bot, Code, Database, Brain, Building2, Layers, Flame,
  CheckSquare, Clock, ArrowRight, Activity, Sparkles, LayoutDashboard,
  BarChart3, User, Settings, LogOut, ChevronRight, Check, CheckCircle2, TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Solve 2 Array problems', category: 'DSA', duration: '30 mins', completed: true },
    { id: 't2', title: 'Practice SQL JOIN queries', category: 'SQL', duration: '20 mins', completed: true },
    { id: 't3', title: 'Complete Mock Interview', category: 'Interview', duration: '15 mins', completed: false },
    { id: 't4', title: 'Revise OOP concepts', category: 'Theory', duration: '25 mins', completed: false }
  ]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [activities, setActivities] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [tasksRes, actRes] = await Promise.allSettled([
          fetchAPI('/roadmap/tasks'),
          fetchAPI('/profile/activities')
        ]);

        if (tasksRes.status === 'fulfilled' && tasksRes.value?.success && tasksRes.value.tasks?.length > 0) {
          setTasks(tasksRes.value.tasks);
        }

        if (actRes.status === 'fulfilled' && actRes.value?.success && actRes.value.activities?.length > 0) {
          setActivities(actRes.value.activities);
        } else {
          setActivities([
            { type: 'Resume AI', title: 'Resume ATS compatibility score updated to 85/100', timestamp: '2 hours ago' },
            { type: 'DSA Sandbox', title: 'Solved Two Sum (Easy) & Passed 15 test cases', timestamp: '5 hours ago' },
            { type: 'Mock Interview', title: 'TCS Technical Round 1 - Overall Score 75%', timestamp: 'Yesterday' }
          ]);
        }
      } catch (e) {
        console.error('Failed to load dashboard progress data:', e);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadDashboardData();
  }, []);

  const toggleTask = async (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    try {
      await fetchAPI(`/roadmap/tasks/${id}/toggle`, 'PUT');
    } catch (e) {
      console.error(e);
    }
  };

  const completedTaskCount = tasks.filter(t => t.completed).length;
  const taskProgressPercent = Math.round((completedTaskCount / (tasks.length || 1)) * 100);

  // Dynamic Scores
  const dsaScore = user?.scores?.dsa || 68;
  const aptitudeScore = user?.scores?.aptitude || 81;
  const sqlScore = user?.scores?.sql || 72;
  const devScore = user?.scores?.development || 88;
  const interviewScore = user?.scores?.interview || 75;
  const resumeScore = user?.scores?.resume || 85;

  const realReadinessScore = Math.round(
    (dsaScore + aptitudeScore + sqlScore + devScore + interviewScore + resumeScore) / 6
  );

  const scoreBreakdown = [
    { name: 'DSA', score: dsaScore, color: 'bg-indigo-600', bgSoft: 'bg-indigo-50 text-indigo-700' },
    { name: 'SQL', score: sqlScore, color: 'bg-blue-600', bgSoft: 'bg-blue-50 text-blue-700' },
    { name: 'Aptitude', score: aptitudeScore, color: 'bg-emerald-600', bgSoft: 'bg-emerald-50 text-emerald-700' },
    { name: 'Interview', score: interviewScore, color: 'bg-purple-600', bgSoft: 'bg-purple-50 text-purple-700' },
    { name: 'Resume', score: resumeScore, color: 'bg-cyan-600', bgSoft: 'bg-cyan-50 text-cyan-700' },
    { name: 'Development', score: devScore, color: 'bg-amber-600', bgSoft: 'bg-amber-50 text-amber-700' }
  ];

  const sidebarLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume AI', path: '/resume-ai', icon: FileText },
    { name: 'Job Match', path: '/job-match', icon: Target },
    { name: 'DSA Practice', path: '/dsa', icon: Code },
    { name: 'Aptitude', path: '/aptitude', icon: Brain },
    { name: 'SQL Practice', path: '/sql', icon: Database },
    { name: 'Mock Interview', path: '/mock-interview', icon: Bot },
    { name: 'Companies', path: '/company-prep', icon: Building2 },
    { name: 'Roadmap', path: '/roadmap', icon: Layers },
    { name: 'Progress', path: '/profile', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm h-fit sticky top-20">
          <div className="px-3 py-2 mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Navigation Hub</span>
          </div>

          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/15'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <IconComponent className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Settings & Profile */}
          <div className="mt-8 pt-4 border-t border-slate-100 space-y-1">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            >
              <User className="w-4 h-4 text-indigo-600" /> User Profile
            </Link>
            <button
              onClick={logoutUser}
              className="w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <main className="flex-1 space-y-6">
          
          {/* WELCOME BAR & READINESS RING */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-3 text-center md:text-left relative z-10">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="badge badge-indigo text-xs font-bold">
                  Role: {user?.targetRole || 'Software Developer'}
                </span>
                <span className="badge badge-purple text-xs font-bold">
                  Target: {user?.targetCompany || 'TCS'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Good morning, {user?.name?.split(' ')[0] || 'Abhishek'} 👋
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                Ready to improve your placement readiness today? You are currently{' '}
                <span className="text-indigo-600 font-extrabold">{realReadinessScore}% placement ready</span>.
              </p>
            </div>

            {/* Placement Readiness Ring Visualizer */}
            <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 shrink-0">
              <ReadinessRing score={realReadinessScore} size={120} strokeWidth={10} />
              
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-lg border border-amber-200 text-xs font-extrabold">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{user?.streak?.current || 7} Day Streak</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Longest: <span className="text-slate-900 font-bold">{user?.streak?.longest || 14} Days</span></p>
                <Link to="/roadmap" className="inline-flex items-center gap-1 text-xs text-indigo-600 font-bold hover:underline">
                  View Daily Schedule <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* SKILL READINESS GRID CARDS */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" /> Skill Performance Metrics
              </h2>
              <span className="text-xs text-slate-500 font-medium">Updated today</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {scoreBreakdown.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600">{item.name}</span>
                    <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${item.bgSoft}`}>{item.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TODAY'S PREPARATION & PROGRESS ANALYTICS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Today's Preparation Plan */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-extrabold text-slate-900">Today's Preparation</h3>
                  </div>
                  <span className="badge badge-emerald font-bold">
                    {completedTaskCount}/{tasks.length} Completed ({taskProgressPercent}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${taskProgressPercent}%` }} />
                </div>

                {/* Tasks List */}
                <div className="space-y-2.5">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        task.completed
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-500'
                          : 'bg-slate-50 hover:bg-indigo-50/40 border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                          task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {task.title}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">{task.category} • {task.duration}</p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {task.completed ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/roadmap" className="gradient-btn text-center text-xs py-3 font-bold w-full mt-2">
                Open Full Preparation Schedule →
              </Link>
            </div>

            {/* Progress Analytics / Activity Stream */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-extrabold text-slate-900">Recent Activity</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {activities.map((act, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">{act.type}</span>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{act.title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">{act.timestamp || act.time || 'Recently'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3 text-indigo-900">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                <p className="text-xs font-medium">
                  Solving <span className="font-bold">2 DSA problems</span> today will increase your overall score by 3%!
                </p>
              </div>
            </div>

          </div>

          {/* QUICK ACCESS MODULE HUB CARDS */}
          <div>
            <h2 className="text-base font-extrabold text-slate-900 mb-3.5">Placement Modules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Resume AI', path: '/resume-ai', icon: FileText, desc: `ATS Compatibility Score: ${resumeScore}/100`, badge: 'Soft Purple', bg: 'bg-purple-50 text-purple-600' },
                { title: 'Job Match', path: '/job-match', icon: Target, desc: 'Analyze Job Descriptions & Skill Gaps', bg: 'bg-blue-50 text-blue-600' },
                { title: 'DSA Practice', path: '/dsa', icon: Code, desc: `100+ Curated Problems • Score ${dsaScore}%`, bg: 'bg-emerald-50 text-emerald-600' },
                { title: 'SQL Practice', path: '/sql', icon: Database, desc: `Live Query Editor • Mastery ${sqlScore}%`, bg: 'bg-amber-50 text-amber-600' },
                { title: 'Aptitude Practice', path: '/aptitude', icon: Brain, desc: `Quant & Reasoning • Accuracy ${aptitudeScore}%`, bg: 'bg-indigo-50 text-indigo-600' },
                { title: 'Mock Interview', path: '/mock-interview', icon: Bot, desc: `AI Simulator • Feedback ${interviewScore}%`, bg: 'bg-rose-50 text-rose-600' },
                { title: 'Companies', path: '/company-prep', icon: Building2, desc: 'TCS, Infosys, Wipro Roadmaps', bg: 'bg-cyan-50 text-cyan-600' },
                { title: 'Roadmap', path: '/roadmap', icon: Layers, desc: 'Daily Target Tracker & Schedule', bg: 'bg-teal-50 text-teal-600' }
              ].map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <Link
                    key={idx}
                    to={card.path}
                    className="light-card p-5 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${card.bg}`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{card.title}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </main>
      </div>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
