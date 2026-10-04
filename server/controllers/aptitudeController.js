import { defaultAptitudeQuestions } from '../utils/seedData.js';
import { memoryStore } from '../utils/memoryStore.js';
import { updateRealUserProgress } from '../utils/userProgress.js';
import { aiRouter } from '../ai/aiRouter.js';

export const getAptitudeQuestions = async (req, res) => {
  const { category, topic, difficulty } = req.query;
  let questions = [...defaultAptitudeQuestions];

  if (category && category !== 'All') {
    questions = questions.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }

  if (topic && topic !== 'All') {
    questions = questions.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
  }

  if (difficulty && difficulty !== 'All') {
    questions = questions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  res.status(200).json({ success: true, count: questions.length, questions });
};

export const submitAptitudeAnswers = async (req, res) => {
  const { answers } = req.body;
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ success: false, message: 'Invalid answers payload' });
  }

  let correctCount = 0;
  const results = answers.map(item => {
    const q = defaultAptitudeQuestions.find(x => x.id === item.questionId);
    if (!q) return { questionId: item.questionId, isCorrect: false };
    const isCorrect = q.correctIndex === item.selectedIndex;
    if (isCorrect) correctCount++;
    return {
      questionId: q.id,
      question: q.question,
      selectedIndex: item.selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    };
  });

  const accuracy = Math.round((correctCount / answers.length) * 100) || 0;
  const userId = req.user._id || req.user.id;

  memoryStore.aptitudeAttempts.push({
    userId,
    totalQuestions: answers.length,
    correctCount,
    accuracy,
    submittedAt: new Date().toISOString()
  });

  const updatedProgress = await updateRealUserProgress(
    userId,
    'aptitude',
    accuracy,
    `Completed Aptitude Test (${correctCount}/${answers.length} correct - ${accuracy}%)`,
    'Aptitude Test'
  );

  res.status(200).json({
    success: true,
    totalQuestions: answers.length,
    correctCount,
    accuracy,
    updatedProgress,
    results
  });
};

export const explainAptitudeQuestion = async (req, res, next) => {
  try {
    const { questionId, questionText, selectedAnswer, correctAnswer } = req.body;
    const q = defaultAptitudeQuestions.find(x => x.id === questionId);

    const prompt = `Explain step-by-step why Option "${correctAnswer || q?.options[q?.correctIndex]}" is correct and why Option "${selectedAnswer}" is wrong for the following question:
Question: "${questionText || q?.question}"`;

    const explanation = await aiRouter.generateText(prompt, 'You are an Aptitude & Quantitative Reasoning Tutor.');

    res.status(200).json({
      success: true,
      explanation: explanation || q?.explanation || 'Step-by-step solution calculation.'
    });
  } catch (error) {
    next(error);
  }
};
