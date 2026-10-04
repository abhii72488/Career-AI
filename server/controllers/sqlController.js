import { defaultSQLProblems } from '../utils/seedData.js';
import { executeSQLQuery } from '../services/sqlRunnerService.js';
import { memoryStore } from '../utils/memoryStore.js';
import { updateRealUserProgress } from '../utils/userProgress.js';

export const getSQLProblems = async (req, res) => {
  const { topic, difficulty } = req.query;
  let problems = [...defaultSQLProblems];

  if (topic && topic !== 'All') {
    problems = problems.filter(p => p.topic.toLowerCase().includes(topic.toLowerCase()));
  }

  if (difficulty && difficulty !== 'All') {
    problems = problems.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  res.status(200).json({ success: true, count: problems.length, problems });
};

export const executeSQL = async (req, res, next) => {
  try {
    const { problemId, query } = req.body;
    const problem = defaultSQLProblems.find(p => p.id === problemId);

    if (!problem) {
      return res.status(404).json({ success: false, message: 'SQL Problem not found' });
    }

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please enter an SQL Query.' });
    }

    const executionResult = await executeSQLQuery(
      query,
      problem.schemaDDL,
      problem.sampleDataDML,
      problem.solutionQuery
    );

    const userId = req.user._id || req.user.id;
    memoryStore.sqlAttempts.push({
      userId,
      problemId: problem.id,
      query,
      isCorrect: executionResult.isCorrect,
      submittedAt: new Date().toISOString()
    });

    // Update real SQL score
    const correctCount = memoryStore.sqlAttempts.filter(a => a.userId === userId && a.isCorrect).length;
    const realSqlScore = Math.min(100, Math.max(55, 55 + (correctCount * 10)));

    const updatedProgress = await updateRealUserProgress(
      userId,
      'sql',
      realSqlScore,
      `Executed SQL on ${problem.title} - ${executionResult.isCorrect ? 'Correct Result' : 'Executed'}`,
      'SQL Query'
    );

    res.status(200).json({
      success: true,
      result: executionResult,
      updatedProgress,
      explanation: problem.explanation
    });
  } catch (error) {
    next(error);
  }
};

