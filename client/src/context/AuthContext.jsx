import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAPI } from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pre-seed demo student user if not logged in
  const defaultDemoUser = {
    _id: 'user_demo_101',
    id: 'user_demo_101',
    name: 'Abhishek Chauhan',
    email: 'abhishek@careerai.dev',
    role: 'USER',
    college: 'Delhi Technological University',
    degree: 'B.Tech',
    branch: 'Computer Science',
    graduationYear: 2026,
    skills: ['Java', 'React', 'Node.js', 'MongoDB', 'SQL', 'Basic DSA'],
    targetRole: 'Software Developer',
    targetCompany: 'TCS',
    experienceLevel: 'Fresher',
    dailyHours: 4,
    readinessScore: 72,
    scores: { dsa: 65, aptitude: 80, sql: 55, development: 85, communication: 50, interview: 60, resume: 75 },
    streak: { current: 5, longest: 12 }
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('career_ai_token');
      if (token) {
        try {
          const res = await fetchAPI('/auth/me');
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            setUser(defaultDemoUser);
          }
        } catch (e) {
          setUser(defaultDemoUser);
        }
      } else {
        setUser(defaultDemoUser);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const res = await fetchAPI('/auth/login', 'POST', { email, password });
      if (res.success && res.token) {
        localStorage.setItem('career_ai_token', res.token);
        setUser(res.user);
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const registerUser = async (formData) => {
    try {
      const res = await fetchAPI('/auth/register', 'POST', formData);
      if (res.success && res.token) {
        localStorage.setItem('career_ai_token', res.token);
        setUser(res.user);
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('career_ai_token');
    setUser(null);
  };

  const updateUserProfileState = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logoutUser, updateUserProfileState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
