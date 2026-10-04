import { env } from '../config/env.js';
import { geminiProvider } from './geminiService.js';
import { openaiProvider } from './openaiService.js';
import { ollamaProvider } from './ollamaService.js';

/**
 * AI Router Abstraction Layer
 * Dynamically routes requests to configured model providers (Gemini, OpenAI, Ollama)
 */
class AIRouter {
  constructor() {
    this.providers = {
      gemini: geminiProvider,
      openai: openaiProvider,
      ollama: ollamaProvider
    };
  }

  getProvider(overrideProvider = null) {
    const providerKey = (overrideProvider || env.AI_PROVIDER || 'gemini').toLowerCase();
    const selected = this.providers[providerKey];
    if (!selected) {
      console.warn(`[AI Router Warning] Provider '${providerKey}' not supported. Defaulting to Gemini.`);
      return this.providers.gemini;
    }
    return selected;
  }

  /**
   * Execute task with primary provider and controlled safety fallbacks
   */
  async executeTask(taskFn, taskName = 'AI Task') {
    const primary = this.getProvider();

    try {
      return await taskFn(primary);
    } catch (primaryErr) {
      console.error(`[AI Router Error] ${taskName} failed with primary provider '${primary.name}':`, primaryErr.message);

      // Attempt fallback if OpenAI or Ollama are configured
      if (primary.name !== 'openai' && env.OPENAI_API_KEY) {
        try {
          console.log(`[AI Router Fallback] Retrying ${taskName} using OpenAI provider...`);
          return await taskFn(this.providers.openai);
        } catch (fallbackErr) {
          console.error(`[AI Router Error] ${taskName} fallback to OpenAI also failed:`, fallbackErr.message);
        }
      }

      throw primaryErr;
    }
  }

  async generateText(prompt, systemInstruction = '', options = {}) {
    return this.executeTask(
      (provider) => provider.generateText(prompt, systemInstruction, options),
      'generateText'
    );
  }

  async generateStructuredOutput(prompt, systemInstruction = '', options = {}) {
    return this.executeTask(
      (provider) => provider.generateStructuredOutput(prompt, systemInstruction, options),
      'generateStructuredOutput'
    );
  }

  async analyzeResume(resumeText, userProfile = {}) {
    const prompt = `Analyze the student resume for tech placement readiness.
Target Role: ${userProfile.targetRole || 'Software Developer'}
Target Company: ${userProfile.targetCompany || 'TCS'}

Resume Text:
"""
${resumeText}
"""

Return strictly a JSON object with this exact shape:
{
  "overallScore": 82,
  "atsScore": 79,
  "sectionScores": {
    "skills": 85,
    "projects": 75,
    "experience": 65,
    "keywords": 80
  },
  "extractedInfo": {
    "name": "Candidate Name",
    "email": "email@example.com",
    "skills": ["Skill1", "Skill2"],
    "projects": ["Project 1"],
    "education": "Degree details",
    "certifications": ["Cert 1"]
  },
  "formattingWarnings": ["Warning 1"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "bulletRewrites": [
    { "id": "b1", "original": "Original text", "improved": "Action-oriented improved text with metrics" }
  ]
}`;

    return this.generateStructuredOutput(
      prompt,
      'You are a senior hiring manager and ATS optimization system. Output valid JSON only.',
      { temperature: 0.3 }
    );
  }

  async matchJob(resumeText, jobDescription) {
    const prompt = `Evaluate compatibility between candidate resume and job description.
Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""

Return strictly JSON format:
{
  "matchPercentage": 84,
  "matchedSkills": ["Skill A", "Skill B"],
  "missingSkills": ["Skill C"],
  "requiredSkills": ["Skill A", "Skill B", "Skill C"],
  "strengths": ["Strength 1"],
  "weaknesses": ["Weakness 1"],
  "recommendations": ["Recommendation 1"],
  "interviewTopics": ["Topic 1", "Topic 2"]
}`;

    return this.generateStructuredOutput(
      prompt,
      'You are an AI Job Match Engine. Output strictly valid JSON.',
      { temperature: 0.3 }
    );
  }

  async generateInterviewQuestion(sessionContext) {
    const prompt = `Generate an interview question based on user profile & session context:
Role: ${sessionContext.role || 'Software Engineer'}
Topic: ${sessionContext.topic || 'General Tech'}
Difficulty: ${sessionContext.difficulty || 'Medium'}
Previous Q&A Context: ${JSON.stringify(sessionContext.previousQA || [])}

Return strictly JSON:
{
  "question": "Question text here",
  "expectedKeyPoints": ["Point 1", "Point 2"],
  "category": "${sessionContext.topic || 'Technical'}"
}`;

    return this.generateStructuredOutput(prompt, 'You are an AI Mock Interviewer.', { temperature: 0.5 });
  }

  async evaluateInterviewAnswer(question, userAnswer, role = 'Software Engineer') {
    const prompt = `Evaluate candidate answer for an interview question.
Role: ${role}
Question: "${question}"
Candidate Answer: "${userAnswer}"

Return strictly JSON:
{
  "score": 80,
  "technicalCorrectness": 85,
  "communication": 75,
  "feedback": "Detailed constructive feedback",
  "idealAnswer": "Key points that should have been mentioned",
  "strengths": ["Clear explanation"],
  "improvements": ["Elaborate on edge cases"]
}`;

    return this.generateStructuredOutput(prompt, 'You are an AI Technical Interview Evaluator.', { temperature: 0.3 });
  }

  async generateDSAExplanation(problemDescription, codeSnippet = '') {
    const prompt = `Provide an educational explanation for this Data Structures & Algorithms problem.
Problem:
"""
${problemDescription}
"""
Candidate Solution (if provided):
"""
${codeSnippet}
"""

Return strictly JSON:
{
  "bruteForceApproach": "Brute force logic explanation",
  "optimalApproach": "Optimized logic explanation",
  "timeComplexity": "O(N log N)",
  "spaceComplexity": "O(1)",
  "hints": ["Hint 1", "Hint 2"],
  "followUpQuestions": ["Follow up 1"]
}`;

    return this.generateStructuredOutput(prompt, 'You are a DSA Coach.', { temperature: 0.3 });
  }

  async generateRoadmap(userState) {
    const prompt = `Generate a personalized placement roadmap.
User Readiness Score: ${userState.readinessScore || 70}
Target Role: ${userState.targetRole || 'Software Developer'}
Weak Skills: ${JSON.stringify(userState.weakSkills || [])}

Return strictly JSON:
{
  "dailyTasks": ["Task 1", "Task 2"],
  "weeklyGoals": ["Goal 1", "Goal 2"],
  "recommendedTopics": ["Topic 1", "Topic 2"],
  "revisionSchedule": ["Day 1: Topic A"],
  "dsaRecommendations": ["Array - Two Pointers", "Binary Trees"]
}`;

    return this.generateStructuredOutput(prompt, 'You are a Placement Coach.', { temperature: 0.4 });
  }

  async answerFromContext(context, question) {
    const prompt = `Answer the question strictly based on the retrieved document context below.
If the information is not contained in the context, explicitly state: "Information not found in retrieved placement documents." Do not invent facts.

Context:
"""
${context}
"""

Question: ${question}`;

    return this.generateText(prompt, 'You are a RAG Document Assistant.', { temperature: 0.2 });
  }
}

export const aiRouter = new AIRouter();
