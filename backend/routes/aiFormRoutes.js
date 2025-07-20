import express from 'express';
import { generateFormWithAI } from '../controllers/aiFormController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// This line defines that a POST request to the root of this router ('/')
// which corresponds to POST /api/ai-form/generate, will be handled
// by the generateFormWithAI controller function.
router.post('/generate', protect, authorizeRoles('admin'), generateFormWithAI);

export default router;