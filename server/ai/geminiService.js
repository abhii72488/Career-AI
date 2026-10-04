import { env } from '../config/env.js';

/**
 * Primary Google Gemini Service Adapter
 */
export const geminiProvider = {
  name: 'gemini',

  /**
   * Raw text completion via Gemini REST API
   */
  async generateText(prompt, systemInstruction = '', options = {}) {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured in backend environment.');
    }

    const modelName = options.model || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 30000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt }]
            }
          ],
          generationConfig: {
            temperature: options.temperature ?? 0.4,
            maxOutputTokens: options.maxTokens ?? 2048,
            ...(options.json ? { responseMimeType: 'application/json' } : {})
          }
        })
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API Error ${response.status}: ${errorData?.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini API returned empty response candidates.');
      }

      return text;
    } catch (error) {
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        throw new Error('Gemini API request timed out (30s limit exceeded).');
      }
      throw error;
    }
  },

  /**
   * Structured JSON completion with regex fallback extraction
   */
  async generateStructuredOutput(prompt, systemInstruction = '', options = {}) {
    const textResult = await this.generateText(prompt, systemInstruction, { ...options, json: true });

    try {
      return JSON.parse(textResult);
    } catch (e) {
      // Clean markdown codeblocks if model included ```json ... ```
      const cleaned = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
        return JSON.parse(cleaned);
      } catch (innerErr) {
        const jsonMatch = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Failed to parse AI output into valid JSON structure.');
      }
    }
  }
};
