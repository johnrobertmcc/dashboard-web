import { Router } from 'express';
import {
  getBudget,
  setBudget,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetController.js';
const router = Router();
router.route('/').get(getBudget).post(setBudget);
router.route('/:id').put(updateBudget).delete(deleteBudget);

export default router;
