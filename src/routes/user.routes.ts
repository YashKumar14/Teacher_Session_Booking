import { Router } from 'express';
import userController from '../controllers/UserController';
import { asyncHandler } from '../utils/asyncHandler';
import { validateCreateUser } from '../middlewares/validation.middleware';

const router = Router();
router.post('/', validateCreateUser, asyncHandler(userController.createUser));
router.get('/:id/sessions', asyncHandler(userController.getUserSessions));

export default router;
