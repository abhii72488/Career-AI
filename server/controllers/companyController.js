import { defaultCompanies } from '../utils/seedData.js';
import { generateAIResponse } from '../services/aiService.js';

export const getCompanies = async (req, res) => {
  res.status(200).json({ success: true, count: defaultCompanies.length, companies: defaultCompanies });
};

export const getCompanyBySlug = async (req, res) => {
  const { slug } = req.params;
  const company = defaultCompanies.find(c => c.slug.toLowerCase() === slug.toLowerCase() || c.id === slug);

  if (!company) {
    return res.status(404).json({ success: false, message: 'Company preparation guide not found' });
  }

  res.status(200).json({ success: true, company });
};

export const generateCompanyRoadmap = async (req, res, next) => {
  try {
    const { companyName, daysAvailable, hoursPerDay } = req.body;
    const user = req.user;

    const prompt = `Generate a customized day-by-day placement preparation schedule for target company "${companyName || 'TCS'}".
Student Profile:
- Skills: ${(user.skills || []).join(', ')}
- Available Days: ${daysAvailable || 7}
- Daily Study Hours: ${hoursPerDay || user.dailyHours || 4}

Return JSON array of daily tasks:
[
  { "day": 1, "focus": "Company Aptitude Patterns", "tasks": ["Solve 20 Quant questions", "Review Time & Work formulas"] },
  { "day": 2, "focus": "DSA Problem Solving", "tasks": ["Solve 2 Array problems", "Practice String pattern matching"] }
]`;

    const aiPlan = await generateAIResponse(prompt, 'You are a career placement planner.', true);
    if (aiPlan && Array.isArray(aiPlan)) return res.status(200).json({ success: true, companyName, plan: aiPlan });

    const company = defaultCompanies.find(c => c.name.toLowerCase().includes((companyName || 'tcs').toLowerCase())) || defaultCompanies[0];
    res.status(200).json({ success: true, companyName: company.name, plan: company.dayPlan });
  } catch (error) {
    next(error);
  }
};
