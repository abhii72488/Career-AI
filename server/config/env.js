import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/career_ai',
  JWT_SECRET: process.env.JWT_SECRET || 'career_ai_super_secret_jwt_key_2026_placement_ready',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  
  // AI Keys
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  AI_PROVIDER: process.env.AI_PROVIDER || 'gemini',
  
  // Vector DB / Embeddings (Optional)
  EMBEDDING_API_KEY: process.env.EMBEDDING_API_KEY || '',
  VECTOR_DB_URL: process.env.VECTOR_DB_URL || '',
  VECTOR_DB_API_KEY: process.env.VECTOR_DB_API_KEY || '',
};

export const validateEnv = () => {
  const missing = [];
  if (!process.env.JWT_SECRET && env.NODE_ENV === 'production') {
    missing.push('JWT_SECRET');
  }
  if (missing.length > 0) {
    console.warn(`[Config Warning] Missing production environment variables: ${missing.join(', ')}`);
  }
};
