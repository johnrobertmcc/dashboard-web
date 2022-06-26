import { Router } from 'express';
import { loginUser } from '../controllers/userController.js';
import {
  registerUser,
  updateUser,
  deleteUser,
  getUser,
} from '../controllers/userController.js';
const router = Router();
router.route('/me').get(getUser);
router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/:id').put(updateUser).delete(deleteUser);

export default router;
