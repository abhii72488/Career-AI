import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Search, Sparkles, User, LogOut, Shield, Flame, Menu, X, ChevronDown, Layers } from 'lucide-react';
import GlobalSearchModal from './GlobalSearchModal.jsx';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Resume AI', path: '/resume-ai' },
    { name: 'Job Match', path: '/job-match' },
    { name: 'DSA', path: '/dsa' },
    { name: 'SQL', path: '/sql' },
    { name: 'Aptitude', path: '/aptitude' },
    { name: 'Mock Interview', path: '/mock-interview' },
    { name: 'Documents', path: '/rag-docs' },
    { name: 'Companies', path: '/company-prep' },
    { name: 'Roadmap', path: '/roadmap' },
  ];

  return (
    <>
      {/* ========================================================= */}
      {/* TOP STICKY NAVBAR (Positioned cleanly at the top)         */}
      {/* ========================================================= */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-200 border-b ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm'
            : 'bg-white/85 backdrop-blur-md border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              CAREER<span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Center: Top Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {!user ? (
              <>
                <Link
                  to="/"
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    location.pathname === '/' ? 'text-indigo-600 bg-indigo-50 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  Home
                </Link>
                <a
                  href="/#features"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
                >
                  Features
                </a>
                <Link
                  to="/dsa"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
                >
                  Practice
                </Link>
                <Link
                  to="/company-prep"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
                >
                  Companies
                </Link>
              </>
            ) : (
              navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-200/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300 text-xs font-medium transition-all"
            >
              <Search className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Search modules...</span>
              <kbd className="hidden sm:inline bg-white text-[10px] px-1.5 py-0.5 rounded border border-slate-200 text-slate-500 shadow-2xs font-mono">Ctrl K</kbd>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all border border-slate-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.name?.charAt(0) || 'A'}
                  </div>
                  <span className="hidden md:inline text-xs font-bold text-slate-800">{user.name?.split(' ')[0]}</span>
                  {user.streak?.current > 0 && (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-200">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {user.streak.current}d
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in">
                    <div className="p-2.5 border-b border-slate-100 mb-1 bg-slate-50/50 rounded-xl">
                      <p className="text-xs font-extrabold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {user.targetRole || 'Software Engineer'} @ {user.targetCompany || 'TCS'}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-indigo-500" /> User Profile & Settings
                    </Link>

                    <Link
                      to="/roadmap"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
                    >
                      <Layers className="w-4 h-4 text-emerald-500" /> Daily Roadmap
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-purple-700 hover:bg-purple-50"
                      >
                        <Shield className="w-4 h-4 text-purple-600" /> Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-xs py-2 px-3.5 font-bold">
                  Log In
                </Link>
                <Link to="/register" className="gradient-btn text-xs py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1.5 animate-fade-in shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  location.pathname === link.path
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
