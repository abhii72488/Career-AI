import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FloatingAssistant from '../components/FloatingAssistant.jsx';
import SourceBadge from '../components/common/SourceBadge.jsx';
import { fetchAPI } from '../services/api.js';
import { Target, CheckCircle2, AlertTriangle, XCircle, Sparkles, ArrowRight, Briefcase, Search, ExternalLink } from 'lucide-react';

export default function JobMatch() {
  const [jobDescriptionText, setJobDescriptionText] = useState(`Job Title: Software Developer (Java / React)
Role Overview:
Looking for a fresh software engineer with strong fundamentals in Java, SQL, REST APIs, Git, and Data Structures. Candidates will develop scalable backend services using Spring Boot and frontend components in React. Experience with Docker and microservices is a major plus. Must have good problem-solving ability.`);
  
  const [report, setReport] = useState({
    matchPercentage: 78,
    overallVerdict: 'Strong match! You possess 4 out of 6 core required skills. Focus on Spring Boot & System Design to reach 90% suitability.',
    skillsBreakdown: {
      matched: ['Java Programming', 'React.js', 'SQL Databases', 'REST APIs', 'Data Structures'],
      partial: ['Spring Boot Framework', 'Git Version Control'],
      missing: ['System Design Basics', 'Docker Containerization']
    },
    skillGapReport: [
      { skill: 'Spring Boot Framework', priority: 'High', reason: 'Required for backend development in target role.' },
      { skill: 'System Design Basics', priority: 'Medium', reason: 'Required for technical interview round 2.' },
      { skill: 'Docker Containerization', priority: 'Low', reason: 'Bonus skill for deployment workflows.' }
    ]
  });
  
  const [loading, setLoading] = useState(false);
  const [liveJobs, setLiveJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadLiveJobs();
  }, []);

  const loadLiveJobs = async (query = '') => {
    setLoadingJobs(true);
    try {
      const res = await fetchAPI(`/live/jobs?q=${encodeURIComponent(query)}`);
      if (res.success && res.jobs?.length > 0) {
        setLiveJobs(res.jobs);
      }
    } catch (e) {
      console.error('Live jobs load notice:', e);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    if (!jobDescriptionText || jobDescriptionText.trim().length < 15) return;

    setLoading(true);
    try {
      const res = await fetchAPI('/job-match/analyze', 'POST', { jobDescriptionText });
      if (res.success && res.report) {
        setReport(res.report);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadJobIntoAnalyzer = (job) => {
    const formatted = `Job Title: ${job.title} @ ${job.company}\nLocation: ${job.location}\nRequired Skills: ${job.requiredSkills.join(', ')}\n\nJob Description:\n${job.description || ''}`;
    setJobDescriptionText(formatted);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Target className="w-3.5 h-3.5 text-blue-600" /> LIVE JOB MATCH & SKILL GAP ENGINE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Job Match & Skill Gap Analysis</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Compare target Job Descriptions against your profile to discover MATCH, PARTIAL, and MISSING skill roadmaps
          </p>
        </div>

        {/* TOP GRID: ANALYZER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: JOB DESCRIPTION INPUT */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> Paste Job Description
            </h2>

            <textarea
              rows={12}
              value={jobDescriptionText}
              onChange={(e) => setJobDescriptionText(e.target.value)}
              placeholder="Paste Job Description text here..."
              className="text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-900 focus:bg-white"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="gradient-btn w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              {loading ? 'Analyzing Skill Gaps...' : 'Analyze Job Match'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT: SKILL GAP REPORT */}
          <div className="lg:col-span-7 space-y-6">
            {!report && !loading && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs font-semibold">
                Paste a Job Description on the left and click "Analyze" to see your match score!
              </div>
            )}

            {loading && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs font-semibold">
                Comparing candidate skills against job requirements...
              </div>
            )}

            {report && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Match Score Banner */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase font-extrabold text-slate-400">Match Compatibility</p>
                    <p className="text-5xl font-black gradient-text mt-1">{report.matchPercentage}%</p>
                    <p className="text-xs text-slate-600 font-semibold mt-2 max-w-md">{report.overallVerdict}</p>
                  </div>
                </div>

                {/* SKILLS BREAKDOWN */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Skills Requirements Breakdown</h3>

                  {/* MATCHED */}
                  <div>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mb-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> MATCHED SKILLS (✓)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {report.skillsBreakdown?.matched?.map((s, i) => (
                        <span key={i} className="badge badge-emerald text-xs font-bold">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* PARTIAL */}
                  <div>
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mb-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" /> PARTIAL MATCHES (⚠)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {report.skillsBreakdown?.partial?.map((s, i) => (
                        <span key={i} className="badge badge-amber text-xs font-bold">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* MISSING */}
                  <div>
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5 mb-2.5">
                      <XCircle className="w-4 h-4 text-rose-600" /> MISSING SKILLS (❌)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {report.skillsBreakdown?.missing?.map((s, i) => (
                        <span key={i} className="badge badge-rose text-xs font-bold">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SKILL GAP PRIORITIES */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Prioritized Learning Roadmap</h3>
                  <div className="space-y-3">
                    {report.skillGapReport?.map((gap, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-slate-900">{gap.skill}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              gap.priority === 'High' ? 'bg-rose-100 text-rose-800' :
                              gap.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {gap.priority} Priority
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">{gap.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* LIVE DISCOVERED JOBS FEED SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" /> Live Discovered Developer Jobs
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Real-time job opportunities retrieved from official careers APIs and public job feeds
              </p>
            </div>

            {/* Job Search Input */}
            <form onSubmit={(e) => { e.preventDefault(); loadLiveJobs(searchQuery); }} className="flex gap-2">
              <input
                type="text"
                placeholder="Filter by role (e.g. Java, React)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs py-2 px-3 border-slate-200 font-medium"
              />
              <button type="submit" className="btn-secondary text-xs py-2 px-3 font-bold flex items-center gap-1 cursor-pointer">
                <Search className="w-3.5 h-3.5" /> Search
              </button>
            </form>
          </div>

          {loadingJobs ? (
            <div className="py-12 text-center text-slate-500 text-xs font-semibold">
              Retrieving live jobs from official API connectors...
            </div>
          ) : liveJobs.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs font-semibold">
              No live job listings found matching query.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveJobs.map((job) => (
                <div key={job.externalId} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 hover:border-indigo-200 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">{job.title}</h3>
                        <p className="text-xs text-indigo-600 font-bold">{job.company} • {job.location}</p>
                      </div>
                      <span className="badge badge-indigo text-[10px] shrink-0 font-bold">{job.employmentType}</span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-3 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Required Skills Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {job.requiredSkills?.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <SourceBadge
                      sourceName={job.sourceName}
                      sourceUrl={job.officialApplyUrl}
                      freshness={job.freshness}
                      relativeTime={job.relativeTime}
                      confidence={job.confidence}
                    />

                    <button
                      onClick={() => loadJobIntoAnalyzer(job)}
                      className="btn-secondary text-[11px] py-1.5 px-3 font-bold text-indigo-600 hover:text-indigo-700 shrink-0 cursor-pointer text-center"
                    >
                      Match Against My Profile →
                    </button>
                  </div>
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
