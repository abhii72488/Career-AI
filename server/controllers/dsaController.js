import { defaultDSAProblems } from '../utils/seedData.js';
import { executeDSACode } from '../services/codeRunnerService.js';
import { aiRouter } from '../ai/aiRouter.js';
import DSAAttempt from '../models/DSAAttempt.js';
import { memoryStore } from '../utils/memoryStore.js';
import { updateRealUserProgress } from '../utils/userProgress.js';

export const getDSAProblems = async (req, res) => {
  const { category, difficulty, search } = req.query;
  let problems = [...defaultDSAProblems];

  if (category && category !== 'All') {
    problems = problems.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (difficulty && difficulty !== 'All') {
    problems = problems.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    problems = problems.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  res.status(200).json({ success: true, count: problems.length, problems });
};

export const getDSAProblemById = async (req, res) => {
  const { id } = req.params;
  const problem = defaultDSAProblems.find(p => p.id === id || p.slug === id);

  if (!problem) {
    return res.status(404).json({ success: false, message: 'DSA Problem not found' });
  }

  res.status(200).json({ success: true, problem });
};

export const submitDSASolution = async (req, res, next) => {
  try {
    const { problemId, code, language } = req.body;
    const problem = defaultDSAProblems.find(p => p.id === problemId || p.slug === problemId);

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    const evaluation = await executeDSACode(code, language || 'javascript', problem.testCases);
    const userId = req.user._id || req.user.id;

    const statusMap = {
      'Accepted': 'ACCEPTED',
      'Wrong Answer': 'WRONG_ANSWER',
      'Time Limit Exceeded': 'TIME_LIMIT_EXCEEDED'
    };
    const dbStatus = statusMap[evaluation.status] || 'WRONG_ANSWER';

    try {
      await DSAAttempt.create({
        userId,
        problemId: problem.id,
        problemTitle: problem.title,
        category: problem.category,
        difficulty: problem.difficulty,
        language: language || 'javascript',
        code,
        status: dbStatus,
        timeComplexity: problem.timeComplexity || 'O(N)',
        spaceComplexity: problem.spaceComplexity || 'O(1)',
        executionTimeMs: evaluation.runtimeMs || 15
      });
    } catch (dbErr) {
      console.warn('[DSAAttempt Model Warning] Save bypassed:', dbErr.message);
    }

    memoryStore.dsaSubmissions.push({
      userId,
      problemId: problem.id,
      problemTitle: problem.title,
      code,
      language,
      status: evaluation.status,
      passedCount: evaluation.passedCount,
      totalTestCases: evaluation.totalTestCases,
      submittedAt: new Date().toISOString()
    });

    const userSubmissions = memoryStore.dsaSubmissions.filter(s => s.userId === userId && s.status === 'Accepted');
    const uniqueSolvedCount = new Set(userSubmissions.map(s => s.problemId)).size;
    const realDsaScore = Math.min(100, Math.max(65, 65 + (uniqueSolvedCount * 5)));

    const updatedProgress = await updateRealUserProgress(
      userId,
      'dsa',
      realDsaScore,
      `Solved ${problem.title} (${problem.difficulty}) - ${evaluation.status}`,
      'DSA Solved'
    );

    res.status(200).json({
      success: true,
      evaluation,
      updatedProgress,
      message: evaluation.status === 'Accepted' ? 'Congratulations! All test cases passed!' : 'Solution submitted. Check test results for details.'
    });
  } catch (error) {
    next(error);
  }
};

export const explainDSAProblem = async (req, res, next) => {
  try {
    const { problemId, code } = req.body;
    const problem = defaultDSAProblems.find(p => p.id === problemId || p.slug === problemId);

    const description = problem ? `${problem.title}: ${problem.description}` : req.body.description || 'DSA Problem';
    const explanation = await aiRouter.generateDSAExplanation(description, code || '');

    res.status(200).json({
      success: true,
      explanation
    });
  } catch (error) {
    next(error);
  }
};

export const getDSAHint = async (req, res, next) => {
  try {
    const { problemId, hintNumber = 1 } = req.body;
    const problem = defaultDSAProblems.find(p => p.id === problemId || p.slug === problemId);

    const prompt = `Give concise Hint ${hintNumber} for the DSA problem: "${problem?.title || 'Problem'}". Description: "${problem?.description || ''}". Do not reveal full solution code.`;
    const hintText = await aiRouter.generateText(prompt, 'You are an encouraging DSA mentor.');

    res.status(200).json({
      success: true,
      hint: hintText || `Hint ${hintNumber}: Think about simplifying the input or using a hash map.`
    });
  } catch (error) {
    next(error);
  }
};
