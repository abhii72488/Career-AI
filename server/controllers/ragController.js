import { processAndStoreDocument, queryRAGSystem } from '../services/ragService.js';
import { parseResumeText } from '../services/resumeService.js';
import { memoryStore } from '../utils/memoryStore.js';

export const uploadDocument = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let title = req.body.title || 'Placement Study Document';
    let type = req.body.type || 'Study Material';
    let text = req.body.text || '';

    if (req.file) {
      title = req.file.originalname;
      const parsed = await parseResumeText(req.file.buffer, req.file.mimetype);
      if (parsed) text = parsed;
    }

    if (!text || text.trim().length < 20) {
      return res.status(400).json({ success: false, message: 'Could not extract valid text content from document.' });
    }

    const result = await processAndStoreDocument(userId, title, type, text);
    res.status(201).json({
      success: true,
      message: `Document "${title}" processed and indexed successfully into RAG knowledge vector store!`,
      document: result.document,
      chunksCreated: result.chunksCreated
    });
  } catch (error) {
    next(error);
  }
};

export const askRAGQuestion = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide a valid question.' });
    }

    const ragResult = await queryRAGSystem(userId, question);
    res.status(200).json({
      success: true,
      question,
      answer: ragResult.answer,
      citations: ragResult.citations,
      foundDocsCount: ragResult.foundDocsCount
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDocuments = async (req, res) => {
  const userId = req.user._id || req.user.id;
  const docs = memoryStore.documents.filter(d => d.userId === userId);
  res.status(200).json({ success: true, documents: docs });
};
