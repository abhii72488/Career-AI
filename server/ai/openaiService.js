import { env } from '../config/env.js';

/**
 * OpenAI Provider Service Adapter
 */
export const openaiProvider = {
  name: 'openai',

  async generateText(prompt, systemInstruction = '', options = {}) {
    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured in backend environment.');
    }

    const modelName = options.model || 'gpt-4o-mini';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 30000);

    try {
      const messages = [];
      if (systemInstruction) {
        messages.push({ role: 'system', content: systemInstruction });
      }
      messages.push({ role: 'user', content: prompt });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: modelName,
          messages,
          temperature: options.temperature ?? 0.4,
          max_tokens: options.maxTokens ?? 2048,
          ...(options.json ? { response_format: { type: 'json_object' } } : {})
        })
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API Error ${response.status}: ${errJson?.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  },

  async generateStructuredOutput(prompt, systemInstruction = '', options = {}) {
    const textResult = await this.generateText(prompt, systemInstruction, { ...options, json: true });
    return JSON.parse(textResult);
  }
};
