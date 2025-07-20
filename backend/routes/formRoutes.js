import express from 'express';
// Import the new deleteForm function
import { getAllForms, getFormById, deleteForm } from '../controllers/formController.js'; 
import { protect, authorizeRoles } from '../middleware/authMiddleware.js'; // <-- Import authorizeRoles

const router = express.Router();

router.get('/', protect, getAllForms);
router.get('/:id', protect, getFormById);

// This is the new route for deleting a form.
// It's protected and restricted to 'admin' roles.
router.delete('/:id', protect, authorizeRoles('admin'), deleteForm);

export default router;