import { memoryStore } from '../utils/memoryStore.js';
import { calculateDynamicReadiness } from '../utils/readinessCalculator.js';
import { aiRouter } from '../ai/aiRouter.js';
import Roadmap from '../models/Roadmap.js';

export const getRoadmapTasks = async (req, res) => {
  const userId = req.user._id || req.user.id;
  const userTasks = memoryStore.studyTasks.filter(t => t.userId === userId || !t.userId);

  let savedRoadmap = null;
  try {
    savedRoadmap = await Roadmap.findOne({ userId }).sort({ createdAt: -1 });
  } catch (e) {}

  res.status(200).json({ success: true, tasks: userTasks, roadmap: savedRoadmap?.roadmap || null });
};

export const generateAIRoadmap = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const userState = {
      readinessScore: req.user.readinessScore || 72,
      targetRole: req.user.targetRole || 'Software Developer',
      targetCompany: req.user.targetCompany || 'TCS',
      weakSkills: req.user.skills?.filter(s => !['Java', 'SQL'].includes(s)) || ['System Design', 'Docker']
    };

    const generated = await aiRouter.generateRoadmap(userState);

    try {
      await Roadmap.create({
        userId,
        targetRole: userState.targetRole,
        targetCompany: userState.targetCompany,
        readinessScore: userState.readinessScore,
        roadmap: generated
      });
    } catch (dbErr) {
      console.warn('[Roadmap Model Warning] Bypassed MongoDB save:', dbErr.message);
    }

    res.status(200).json({
      success: true,
      roadmap: generated
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTaskCompletion = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id || req.user.id;

  const task = memoryStore.studyTasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }

  task.completed = !task.completed;

  const memUser = memoryStore.users.find(u => u._id === userId || u.id === userId);
  if (memUser && memUser.scores) {
    if (task.category === 'DSA') memUser.scores.dsa = Math.min(100, memUser.scores.dsa + (task.completed ? 3 : -3));
    if (task.category === 'SQL') memUser.scores.sql = Math.min(100, memUser.scores.sql + (task.completed ? 3 : -3));
    if (task.category === 'Aptitude') memUser.scores.aptitude = Math.min(100, memUser.scores.aptitude + (task.completed ? 2 : -2));

    memUser.readinessScore = calculateDynamicReadiness(memUser.scores);
  }

  if (task.completed) {
    memoryStore.recentActivities.unshift({
      id: `act_${Date.now()}`,
      userId,
      type: 'Task Completed',
      title: `Completed daily task: ${task.title}`,
      timestamp: 'Just now'
    });
  }

  res.status(200).json({ success: true, task, updatedReadinessScore: memUser?.readinessScore });
};

export const addCustomTask = async (req, res) => {
  const { title, category, duration } = req.body;
  const userId = req.user._id || req.user.id;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Task title is required.' });
  }

  const newTask = {
    id: `task_${Date.now()}`,
    userId,
    title,
    category: category || 'General',
    duration: duration || '30 mins',
    completed: false,
    date: new Date().toISOString().split('T')[0]
  };

  memoryStore.studyTasks.unshift(newTask);
  res.status(201).json({ success: true, task: newTask });
};
