import { Router } from 'express';
import {
  getBudget,
  setBudget,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.route('/').get(protect, getBudget).post(protect, setBudget);
router.route('/:id').put(protect, updateBudget).delete(protect, deleteBudget);

export default router;
