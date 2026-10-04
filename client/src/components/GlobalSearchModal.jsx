import React, { useState, useEffect } from 'react';
import { Search, X, Code, BookOpen, Database, Building2, FileText, ArrowRight } from 'lucide-react';
import { fetchAPI } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchAPI(`/search?q=${encodeURIComponent(query)}`);
        if (res.success) {
          setResults(res.results);
        }
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-600" />
          <input
            type="text"
            placeholder="Search DSA, Aptitude, SQL, Companies, RAG Docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-slate-900 text-base w-full placeholder:text-slate-400 focus:ring-0"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Display */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading && <p className="text-center text-slate-500 py-6 text-xs font-semibold">Searching CareerAI index...</p>}

          {!loading && results && (
            <>
              {/* DSA Problems */}
              {results.dsa?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" /> DSA Problems
                  </h4>
                  <div className="space-y-1.5">
                    {results.dsa.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => { navigate(`/dsa`); onClose(); }}
                        className="p-3 bg-slate-50 hover:bg-indigo-50/60 border border-slate-100 hover:border-indigo-200 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600">{p.title}</p>
                          <p className="text-xs text-slate-500">{p.category} • {p.difficulty}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Companies */}
              {results.companies?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Target Companies
                  </h4>
                  <div className="space-y-1.5">
                    {results.companies.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => { navigate(`/company/${c.slug}`); onClose(); }}
                        className="p-3 bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 hover:border-emerald-200 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{c.logo}</span>
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-emerald-600">{c.name}</p>
                            <p className="text-xs text-slate-500">{c.category}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SQL Problems */}
              {results.sql?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" /> SQL Practice
                  </h4>
                  <div className="space-y-1.5">
                    {results.sql.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => { navigate(`/sql`); onClose(); }}
                        className="p-3 bg-slate-50 hover:bg-amber-50/60 border border-slate-100 hover:border-amber-200 rounded-xl cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div>
                          <p className="font-bold text-slate-800 text-sm group-hover:text-amber-600">{s.title}</p>
                          <p className="text-xs text-slate-500">{s.topic} • {s.difficulty}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && !results && query.length > 1 && (
            <p className="text-center text-slate-500 py-6 text-xs font-medium">No matching practice items found for "{query}".</p>
          )}

          {!query && (
            <div className="py-8 text-center text-slate-500 text-xs font-medium">
              Try searching <span className="text-indigo-600 font-bold">"Two Sum"</span>, <span className="text-emerald-600 font-bold">"TCS"</span>, or <span className="text-amber-600 font-bold">"JOINs"</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
