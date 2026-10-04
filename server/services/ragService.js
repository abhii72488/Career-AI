import { aiRouter } from '../ai/aiRouter.js';
import Document from '../models/Document.js';
import DocumentChunk from '../models/DocumentChunk.js';
import Conversation from '../models/Conversation.js';
import { memoryStore } from '../utils/memoryStore.js';

function calculateSimilarity(text1, text2) {
  const getTokens = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
  const t1 = getTokens(text1);
  const t2 = getTokens(text2);

  const freq1 = {};
  const freq2 = {};
  t1.forEach(w => freq1[w] = (freq1[w] || 0) + 1);
  t2.forEach(w => freq2[w] = (freq2[w] || 0) + 1);

  const allWords = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;

  allWords.forEach(w => {
    const v1 = freq1[w] || 0;
    const v2 = freq2[w] || 0;
    dotProduct += v1 * v2;
    mag1 += v1 * v1;
    mag2 += v2 * v2;
  });

  if (!mag1 || !mag2) return 0;
  return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

export const processAndStoreDocument = async (userId, docTitle, docType, fullText) => {
  const docId = `doc_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const paragraphs = fullText.split(/\n\s*\n/).filter(p => p.trim().length > 20);
  const chunks = [];
  let chunkIndex = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i].trim();
    chunkIndex++;
    chunks.push({
      id: `chunk_${docId}_${chunkIndex}`,
      documentId: docId,
      userId,
      documentTitle: docTitle,
      documentType: docType,
      chunkIndex,
      content: text,
      createdAt: new Date().toISOString()
    });
  }

  const documentMetadata = {
    id: docId,
    userId,
    title: docTitle,
    type: docType,
    chunkCount: chunks.length,
    characterCount: fullText.length,
    createdAt: new Date().toISOString()
  };

  memoryStore.documents.push(documentMetadata);
  memoryStore.documentChunks.push(...chunks);

  try {
    const docRecord = await Document.create({
      userId,
      filename: docTitle,
      documentType: docType || 'Placement PDF',
      extractedText: fullText,
      chunkCount: chunks.length
    });

    const dbChunks = chunks.map(c => ({
      documentId: docRecord._id,
      userId,
      filename: docTitle,
      chunkIndex: c.chunkIndex,
      content: c.content,
      source: docTitle
    }));

    await DocumentChunk.insertMany(dbChunks);
  } catch (dbErr) {
    console.warn('[RAG Document Model Warning] Save to Mongo bypassed:', dbErr.message);
  }

  return { document: documentMetadata, chunksCreated: chunks.length };
};

export const queryRAGSystem = async (userId, userQuestion) => {
  let userChunks = [];

  try {
    const dbChunks = await DocumentChunk.find({ userId });
    if (dbChunks && dbChunks.length > 0) {
      userChunks = dbChunks.map(c => ({
        content: c.content,
        documentTitle: c.filename,
        documentType: 'Placement Doc',
        chunkIndex: c.chunkIndex
      }));
    }
  } catch (e) {}

  if (userChunks.length === 0) {
    userChunks = memoryStore.documentChunks.filter(c => c.userId === userId);
  }

  if (userChunks.length === 0) {
    return {
      answer: "Information not found in retrieved placement documents. Please upload your placement notes or PDFs first.",
      citations: [],
      foundDocsCount: 0
    };
  }

  const scoredChunks = userChunks.map(chunk => {
    const score = calculateSimilarity(userQuestion, chunk.content);
    return { ...chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  const topChunks = scoredChunks.filter(c => c.score > 0.03).slice(0, 3);

  if (topChunks.length === 0) {
    return {
      answer: "Information not found in retrieved placement documents.",
      citations: [],
      foundDocsCount: 0
    };
  }

  const contextText = topChunks.map((c, i) => `[Source ${i+1}: ${c.documentTitle}]\n"${c.content}"`).join('\n\n');

  let aiAnswer = '';
  try {
    aiAnswer = await aiRouter.answerFromContext(contextText, userQuestion);
  } catch (e) {
    console.warn('[RAG Answer Warning] Fallback text:', e.message);
    aiAnswer = `Based on your document "${topChunks[0].documentTitle}": ${topChunks[0].content}`;
  }

  const citations = topChunks.map(c => ({
    documentTitle: c.documentTitle,
    snippet: c.content.substring(0, 120) + '...',
    relevanceScore: Math.round((c.score || 0.5) * 100) + '%'
  }));

  return {
    answer: aiAnswer || "Information not found in retrieved placement documents.",
    citations,
    foundDocsCount: topChunks.length
  };
};
