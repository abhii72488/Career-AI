import { aiRouter } from '../ai/aiRouter.js';

/**
 * Legacy compatibility wrapper forwarding to the unified AI Router.
 */
export const generateAIResponse = async (prompt, systemInstruction = '', formatJson = true) => {
  try {
    if (formatJson) {
      return await aiRouter.generateStructuredOutput(prompt, systemInstruction);
    }
    return await aiRouter.generateText(prompt, systemInstruction);
  } catch (error) {
    console.warn('[AI Service Warning] Call failed via AI Router:', error.message);
    return null;
  }
};

export { aiRouter };
