import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import { fetchAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Layers, CheckSquare, Plus, Clock, Calendar, Sparkles, CheckCircle2, Check } from 'lucide-react';

export default function Roadmap() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    { id: 'r1', title: 'Solve 2 Sliding Window DSA Problems', category: 'DSA', duration: '30 mins', completed: true },
    { id: 'r2', title: 'Practice SQL Inner & Outer JOINs', category: 'SQL', duration: '20 mins', completed: true },
    { id: 'r3', title: 'Complete AI Mock Technical Interview', category: 'Interview', duration: '15 mins', completed: false },
    { id: 'r4', title: 'Revise Operating Systems & Concurrency', category: 'Theory', duration: '25 mins', completed: false }
  ]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('DSA');
  const [newDuration, setNewDuration] = useState('45 mins');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await fetchAPI('/roadmap/tasks');
      if (res.success && res.tasks?.length > 0) {
        setTasks(res.tasks);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    try {
      await fetchAPI(`/roadmap/tasks/${id}/toggle`, 'PUT');
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle) return;

    try {
      const res = await fetchAPI('/roadmap/tasks', 'POST', {
        title: newTitle,
        category: newCategory,
        duration: newDuration
      });

      if (res.success && res.task) {
        setTasks(prev => [res.task, ...prev]);
        setNewTitle('');
      } else {
        setTasks(prev => [
          { id: `custom_${Date.now()}`, title: newTitle, category: newCategory, duration: newDuration, completed: false },
          ...prev
        ]);
        setNewTitle('');
      }
    } catch (err) {
      setTasks(prev => [
        { id: `custom_${Date.now()}`, title: newTitle, category: newCategory, duration: newDuration, completed: false },
        ...prev
      ]);
      setNewTitle('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5 text-teal-600" /> DYNAMIC STUDY PLANNER
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Personalized Career Roadmap</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Adaptive daily checklist configured for your target role ({user?.targetRole || 'Software Developer'}) and company ({user?.targetCompany || 'TCS'})
            </p>
          </div>

          <div className="text-right text-xs bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium">
            <p>Daily Commitment: <strong className="text-teal-700 font-bold">{user?.dailyHours || 4} Hours</strong></p>
            <p>Streak: <strong className="text-amber-700 font-bold">{user?.streak?.current || 7} Days</strong></p>
          </div>
        </div>

        {/* ADD TASK FORM */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Add Custom Practice Task</h2>
          
          <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Practice 3 Binary Tree DFS Questions"
              className="sm:col-span-6 text-xs font-medium"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="sm:col-span-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 font-bold"
            >
              <option value="DSA">DSA</option>
              <option value="SQL">SQL</option>
              <option value="Aptitude">Aptitude</option>
              <option value="Interview">Interview</option>
              <option value="Development">Development</option>
            </select>

            <button type="submit" className="sm:col-span-3 gradient-btn text-xs py-2.5 font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/20">
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </form>
        </div>

        {/* TASKS CHECKLIST */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-600" /> Daily Action Checklist
          </h2>

          {loading ? (
            <p className="text-xs text-slate-500 py-6 text-center font-medium">Loading study schedule...</p>
          ) : tasks.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center font-medium">No tasks scheduled for today. Add a new task above!</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    task.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-500'
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
                      <p className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">{task.category} • {task.duration}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md ${
                    task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {task.completed ? 'Done ✓' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}
