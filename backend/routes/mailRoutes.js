import express from 'express';
// Controller se naya 'scheduleMail' function import karein
import { sendMail, scheduleMail } from '../controllers/mailController.js'; 
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Pehle se maujood route - email turant bhejne ke liye
router.post('/send', protect, authorizeRoles('admin'), sendMail);

// --- NAYA ROUTE - email ko schedule karne ke liye ---
router.post('/schedule', protect, authorizeRoles('admin'), scheduleMail);

export default router;