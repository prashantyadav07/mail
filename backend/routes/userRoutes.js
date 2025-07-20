import express from 'express';
import { getAllUsers, getNotificationCount, clearNotifications } from '../controllers/userController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for admins to get all users
router.get('/', protect, authorizeRoles('admin'), getAllUsers);

// --- ADD THESE NEW ROUTES FOR NOTIFICATIONS ---
// Route for any logged-in user to get their notification count
router.get('/notifications', protect, getNotificationCount);
// Route for any logged-in user to clear their notifications
router.post('/notifications/clear', protect, clearNotifications);

export default router;