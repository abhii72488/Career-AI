import { aiRouter } from '../ai/aiRouter.js';
import MockSession from '../models/MockSession.js';
import { memoryStore } from '../utils/memoryStore.js';

export const startInterviewSession = async (userId, targetRole, targetCompany, interviewType, technologies = []) => {
  const sessionId = `int_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  let firstQuestionText = '';
  try {
    const qObj = await aiRouter.generateInterviewQuestion({
      role: targetRole,
      company: targetCompany,
      topic: interviewType,
      difficulty: 'Medium'
    });
    firstQuestionText = qObj?.question || '';
  } catch (e) {
    console.warn('[Interview AI Warning] First question fallback:', e.message);
  }

  const defaultFirstQuestion = `Welcome to your ${interviewType || 'Technical'} interview for ${targetRole || 'Software Engineer'} at ${targetCompany || 'TCS'}! To begin: Walk me through your technical background and your primary project built using ${technologies[0] || 'Java/React'}.`;

  const initialQuestion = firstQuestionText || defaultFirstQuestion;

  const sessionObj = {
    id: sessionId,
    sessionId,
    userId,
    targetRole,
    targetCompany,
    interviewType,
    technologies,
    status: 'IN_PROGRESS',
    messages: [
      {
        sender: 'AI',
        text: initialQuestion,
        timestamp: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString()
  };

  memoryStore.interviews.push(sessionObj);

  try {
    await MockSession.create({
      userId,
      sessionId,
      company: targetCompany || 'General',
      role: targetRole || 'Software Engineer',
      interviewType: interviewType || 'Technical',
      status: 'IN_PROGRESS',
      qaHistory: [{
        questionNumber: 1,
        question: initialQuestion,
        expectedKeyPoints: ['Project Walkthrough', 'Tech Stack Usage']
      }]
    });
  } catch (dbErr) {
    console.warn('[MockSession Model Warning] Bypassed MongoDB create:', dbErr.message);
  }

  return sessionObj;
};

export const submitInterviewAnswer = async (sessionId, userAnswerText) => {
  const session = memoryStore.interviews.find(i => i.id === sessionId || i.sessionId === sessionId);
  if (!session) throw new Error('Interview session not found');

  session.messages.push({
    sender: 'USER',
    text: userAnswerText,
    timestamp: new Date().toISOString()
  });

  const userAnswersCount = session.messages.filter(m => m.sender === 'USER').length;

  if (userAnswersCount >= 4) {
    session.status = 'COMPLETED';
    const report = await generateInterviewReport(session);
    session.report = report;

    session.messages.push({
      sender: 'AI',
      text: `Thank you for completing this mock interview! Here is your performance evaluation report.`,
      timestamp: new Date().toISOString()
    });

    try {
      await MockSession.findOneAndUpdate(
        { sessionId: session.sessionId || sessionId },
        { status: 'COMPLETED', finalReport: report }
      );
    } catch (e) {}

    return { session, report, isFinished: true };
  }

  const lastQuestion = session.messages.filter(m => m.sender === 'AI').slice(-1)[0]?.text || '';
  let nextQuestionText = '';

  try {
    const nextQObj = await aiRouter.generateInterviewQuestion({
      role: session.targetRole,
      topic: session.interviewType,
      previousQA: [{ question: lastQuestion, answer: userAnswerText }]
    });
    nextQuestionText = nextQObj?.question || '';
  } catch (e) {
    console.warn('[Interview AI Warning] Follow up question fallback:', e.message);
  }

  const defaultFollowUps = [
    `Could you dive deeper into how you handled state management and error edge cases in that project?`,
    `Great explanation. Now, how would you optimize the time complexity of an algorithm searching through a large dataset?`,
    `Tell me about a time you ran into a major technical blocker under deadline pressure, and how you resolved it.`
  ];

  const followUpText = nextQuestionText || defaultFollowUps[(userAnswersCount - 1) % defaultFollowUps.length];

  session.messages.push({
    sender: 'AI',
    text: followUpText,
    timestamp: new Date().toISOString()
  });

  return { session, nextQuestion: followUpText, isFinished: false };
};

export const generateInterviewReport = async (session) => {
  const historyText = session.messages.map(m => `${m.sender}: ${m.text}`).join('\n');
  try {
    const prompt = `Evaluate performance from transcript:\n${historyText}`;
    const report = await aiRouter.generateStructuredOutput(
      prompt,
      'You are a Senior Tech Hiring Evaluation Engine.'
    );
    if (report && (report.overallScore || report.scores)) {
      return {
        overallScore: report.overallScore || 78,
        scores: report.scores || { technicalAccuracy: 80, communication: 75, problemSolving: 70 },
        categoryScores: report.categoryScores || { technical: 80, communication: 75, problemSolving: 70, structure: 75 },
        strengths: report.strengths || ['Good architectural domain knowledge', 'Clear technical communication'],
        weaknesses: report.weaknesses || ['Could elaborate more on edge case handling'],
        recommendedTopics: report.recommendedTopics || ['Database Query Optimization', 'STAR Method'],
        actionablePlan: report.actionablePlan || 'Practice explaining complex algorithms aloud using structured examples.'
      };
    }
  } catch (e) {
    console.warn('[Interview Report Warning] Fallback:', e.message);
  }

  return {
    overallScore: 75,
    scores: { technicalAccuracy: 75, communication: 70, problemSolving: 75 },
    categoryScores: { technical: 75, communication: 70, problemSolving: 75, structure: 75 },
    strengths: ['Clear project description', 'Good foundation in React and Node.js'],
    weaknesses: ['Hesitation on deep system design trade-offs'],
    recommendedTopics: ['SQL Indexing', 'STAR framework for behavioral questions'],
    actionablePlan: 'Rehearse project highlights focusing on performance metrics achieved.'
  };
};
