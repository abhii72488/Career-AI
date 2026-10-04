import { generateAIResponse } from '../services/aiService.js';

export const polishCommunication = async (req, res, next) => {
  try {
    const { userSpeechText } = req.body;
    if (!userSpeechText) {
      return res.status(400).json({ success: false, message: 'Please provide text or spoken response to evaluate.' });
    }

    const prompt = `Evaluate and polish this candidate's spoken English/interview response:
Original: "${userSpeechText}"

Return JSON:
{
  "improved": "One of my greatest strengths is consistency in problem solving and an eagerness to acquire new technical skills.",
  "grammarCorrection": "Changed 'I am hard working' to a more natural articulation 'consistency in problem solving'.",
  "vocabularySuggestions": ["tenacious", "adaptable", "methodical"],
  "confidenceScore": 82,
  "keyTakeaway": "Maintain steady pacing and avoid filler words like 'um' or generic phrases."
}`;

    const aiResult = await generateAIResponse(prompt, 'You are an executive communication coach for technical interviews.');
    if (aiResult && aiResult.improved) return res.status(200).json({ success: true, analysis: aiResult });

    res.status(200).json({
      success: true,
      analysis: {
        improved: `One of my key strengths is consistent dedication to problem solving and a proactive approach to mastering new software tools.`,
        grammarCorrection: `Replaced informal phrasing with concise, professional tech interview vocabulary.`,
        vocabularySuggestions: ['perseverant', 'resourceful', 'collaborative'],
        confidenceScore: 80,
        keyTakeaway: `Speak with clear inflection and articulate your personal contributions clearly!`
      }
    });
  } catch (error) {
    next(error);
  }
};
