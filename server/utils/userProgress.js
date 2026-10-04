import { memoryStore } from './memoryStore.js';
import User from '../models/User.js';
import { checkMongoStatus } from '../config/db.js';

/**
 * Updates a user's progress dynamically based on real interactions (DSA, SQL, Aptitude, Resume, Interview).
 * Recalculates category score, overall readiness score, streak, and appends a real activity log.
 */
export const updateRealUserProgress = async (userId, category, newCategoryScore, activityTitle, activityType) => {
  try {
    let userObj = null;

    if (checkMongoStatus()) {
      try {
        userObj = await User.findById(userId);
      } catch (e) {
        userObj = null;
      }
    }

    if (!userObj) {
      userObj = memoryStore.users.find(u => u._id === userId || u.id === userId);
    }

    if (!userObj) return null;

    // Ensure scores object exists
    if (!userObj.scores) {
      userObj.scores = { dsa: 65, aptitude: 80, sql: 55, development: 85, communication: 50, interview: 60, resume: 75 };
    }

    // Update specific category score if valid number provided
    if (category && typeof newCategoryScore === 'number') {
      userObj.scores[category] = Math.min(100, Math.max(0, Math.round(newCategoryScore)));
    }

    // Recalculate Overall Readiness Score dynamically as weighted average
    const s = userObj.scores;
    const total = (s.dsa || 0) + (s.aptitude || 0) + (s.sql || 0) + (s.development || 0) + (s.communication || 0) + (s.interview || 0) + (s.resume || 0);
    userObj.readinessScore = Math.round(total / 7);

    // Update streak if needed
    const today = new Date().toISOString().split('T')[0];
    if (!userObj.streak) {
      userObj.streak = { current: 1, longest: 1, lastActive: today };
    } else if (userObj.streak.lastActive !== today) {
      userObj.streak.current = (userObj.streak.current || 0) + 1;
      userObj.streak.longest = Math.max(userObj.streak.longest || 1, userObj.streak.current);
      userObj.streak.lastActive = today;
    }

    // Create Real Activity Log
    const newActivity = {
      id: `act_${Date.now()}`,
      userId,
      type: activityType || `${category?.toUpperCase() || 'Activity'} Completed`,
      title: activityTitle || `Updated ${category} readiness to ${newCategoryScore}%`,
      timestamp: 'Just now',
      date: new Date().toISOString()
    };

    if (!memoryStore.recentActivities) memoryStore.recentActivities = [];
    memoryStore.recentActivities.unshift(newActivity);

    // Save MongoDB if connected
    if (userObj.save && checkMongoStatus()) {
      try {
        await userObj.save();
      } catch (e) {
        console.warn('Mongo save failed:', e.message);
      }
    }

    return {
      scores: userObj.scores,
      readinessScore: userObj.readinessScore,
      streak: userObj.streak,
      newActivity
    };
  } catch (err) {
    console.error('Error updating real user progress:', err);
    return null;
  }
};

export const getRealUserActivities = (userId) => {
  if (!memoryStore.recentActivities) return [];
  return memoryStore.recentActivities.filter(a => a.userId === userId || !a.userId).slice(0, 10);
};
