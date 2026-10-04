import { defaultDSAProblems, defaultAptitudeQuestions, defaultSQLProblems, defaultCompanies } from '../utils/seedData.js';
import { memoryStore } from '../utils/memoryStore.js';

export const globalSearch = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(200).json({
      success: true,
      query: q,
      results: { dsa: [], aptitude: [], sql: [], companies: [], documents: [] }
    });
  }

  const query = q.toLowerCase().trim();

  const dsaMatches = defaultDSAProblems.filter(p =>
    p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.difficulty.toLowerCase().includes(query)
  ).slice(0, 4);

  const aptitudeMatches = defaultAptitudeQuestions.filter(a =>
    a.question.toLowerCase().includes(query) || a.topic.toLowerCase().includes(query) || a.category.toLowerCase().includes(query)
  ).slice(0, 4);

  const sqlMatches = defaultSQLProblems.filter(s =>
    s.title.toLowerCase().includes(query) || s.topic.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)
  ).slice(0, 4);

  const companyMatches = defaultCompanies.filter(c =>
    c.name.toLowerCase().includes(query) || c.category.toLowerCase().includes(query)
  ).slice(0, 4);

  const userId = req.user?._id || req.user?.id;
  const documentMatches = memoryStore.documents
    .filter(d => (!userId || d.userId === userId) && d.title.toLowerCase().includes(query))
    .slice(0, 4);

  res.status(200).json({
    success: true,
    query: q,
    results: {
      dsa: dsaMatches,
      aptitude: aptitudeMatches,
      sql: sqlMatches,
      companies: companyMatches,
      documents: documentMatches
    }
  });
};
