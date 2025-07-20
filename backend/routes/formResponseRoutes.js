import express from 'express';
import { submitFormResponse, getFormResponses } from '../controllers/formResponseController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// User form submission route
router.post('/submit', protect, submitFormResponse);

// Admin-only: get all responses for a form
router.get('/form/:formId', protect, authorizeRoles('admin'), getFormResponses);

export default router;