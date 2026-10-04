import { env } from '../config/env.js';

/**
 * Local Ollama Provider Service Adapter
 */
export const ollamaProvider = {
  name: 'ollama',

  async generateText(prompt, systemInstruction = '', options = {}) {
    const baseUrl = env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const modelName = options.model || 'llama3';

    const response = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: modelName,
        system: systemInstruction,
        prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || '';
  },

  async generateStructuredOutput(prompt, systemInstruction = '', options = {}) {
    const textResult = await this.generateText(prompt, `${systemInstruction}\nOutput ONLY valid JSON.`, options);
    const cleaned = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  }
};
