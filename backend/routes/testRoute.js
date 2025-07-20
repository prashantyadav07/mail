import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Route
router.get('/', (req, res) => {
  res.send('API is working (public)');
});

// Protected Route - Any logged-in user
router.get('/protected', protect, (req, res) => {
  res.json({
    message: 'You are logged in',
    user: req.user,
  });
});

// Admin-Only Route
router.get('/admin-only', protect, authorizeRoles('admin'), (req, res) => {
  res.json({
    message: 'Welcome Admin!',
    user: req.user,
  });
});

// Employee-Only Route
router.get('/employee-only', protect, authorizeRoles('employee'), (req, res) => {
  res.json({
    message: 'Hello Employee!',
    user: req.user,
  });
});

export default router;