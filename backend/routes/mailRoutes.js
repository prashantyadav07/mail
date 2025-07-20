import express from 'express';
import { sendMail } from '../controllers/mailController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', protect, authorizeRoles('admin'), sendMail);

export default router;