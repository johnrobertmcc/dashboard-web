import { Router } from 'express';
import {
  getBudget,
  setBudget,
  updateBudget,
  deleteBudget,
  deleteAll,
  addManyItems,
} from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router
  .route('/')
  .get(protect, getBudget)
  .post(protect, setBudget)
  .delete(protect, deleteAll);
router
  .route('/:id')
  .put(protect, updateBudget)
  .delete(protect, deleteBudget)
  .post(protect, addManyItems);

export default router;
