import { aiRouter } from '../ai/aiRouter.js';

export const askCareerAssistant = async (req, res, next) => {
  try {
    const { question } = req.body;
    const user = req.user;

    if (!question) {
      return res.status(400).json({ success: false, message: 'Question prompt is required.' });
    }

    const contextPrompt = `You are CareerAI's primary AI Career & Placement Guide.
Candidate Details:
- Name: ${user.name}
- Target Role: ${user.targetRole || 'Software Developer'}
- Target Company: ${user.targetCompany || 'TCS'}
- Current Skills: ${(user.skills || []).join(', ')}
- Placement Readiness Score: ${user.readinessScore || 72}%

User Question: "${question}"

Provide a clear, highly actionable, encouraging, and structured answer. Include numbered bullet points or steps where appropriate.`;

    let answerText = '';
    try {
      answerText = await aiRouter.generateText(contextPrompt, 'You are CareerAI, a friendly senior engineering mentor.');
    } catch (e) {
      console.warn('[CareerAssistant AI Warning] Fallback text:', e.message);
    }

    const defaultAnswers = {
      "what should i study today?": `Hi ${user.name}! Based on your current profile (Target: ${user.targetCompany}):\n\n1. **DSA (60 mins):** Solve 2 Array / Two-Pointer problems (e.g. Two Sum).\n2. **SQL (45 mins):** Practice JOIN queries and GROUP BY aggregations.\n3. **Aptitude (30 mins):** Practice 5 Time & Work questions.\n4. **Communication (15 mins):** Record a 2-minute answer for "Tell me about yourself".`,
      "what skills am i missing for a java developer role?": `For a competitive Java Developer role at companies like ${user.targetCompany}:\n\n- **Must-Have:** Spring Boot & REST APIs\n- **Database:** Advanced SQL (JOINs, Window Functions, Indexing)\n- **Core CS:** OOPs concepts, Java Collections Framework, Garbage Collection mechanics\n- **DevOps:** Docker basics & Git branch workflows.`
    };

    const finalAnswer = answerText || defaultAnswers[question.toLowerCase().trim()] || `Great question, ${user.name}! To excel in your ${user.targetRole} preparation for ${user.targetCompany}:\n\n1. **Focus on Core Fundamentals:** Ensure your understanding of DSA and SQL is solid.\n2. **Quantify Achievements:** Ensure your resume project descriptions showcase measurable impacts.\n3. **Daily Consistency:** Aim for focused daily practice hours to boost your readiness score.`;

    res.status(200).json({
      success: true,
      question,
      answer: finalAnswer
    });
  } catch (error) {
    next(error);
  }
};
