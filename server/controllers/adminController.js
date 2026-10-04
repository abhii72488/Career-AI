import { memoryStore } from '../utils/memoryStore.js';
import { defaultDSAProblems, defaultAptitudeQuestions, defaultSQLProblems } from '../utils/seedData.js';

export const getAdminStats = async (req, res) => {
  const stats = {
    totalUsers: memoryStore.users.length + 142,
    activeToday: 48,
    dsaSolved: memoryStore.dsaSubmissions.length + 380,
    mockInterviewsCompleted: memoryStore.interviews.length + 94,
    ragDocumentsUploaded: memoryStore.documents.length + 56,
    avgPlacementReadiness: 74,
    popularTopics: [
      { name: 'Arrays & Two Pointers', count: 184 },
      { name: 'SQL JOINs & Group By', count: 142 },
      { name: 'Quant Time & Work', count: 120 },
      { name: 'TCS Preparation Guide', count: 210 }
    ]
  };

  res.status(200).json({ success: true, stats });
};

export const addDSAProblemAdmin = async (req, res) => {
  const problem = req.body;
  problem.id = `dsa_${Date.now()}`;
  defaultDSAProblems.unshift(problem);
  res.status(201).json({ success: true, message: 'DSA Problem added successfully by Admin', problem });
};

export const addAptitudeQuestionAdmin = async (req, res) => {
  const question = req.body;
  question.id = `apt_${Date.now()}`;
  defaultAptitudeQuestions.unshift(question);
  res.status(201).json({ success: true, message: 'Aptitude question added successfully by Admin', question });
};
