import { Router } from 'express';
import userController from '../controllers/UserController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
router.post('/', asyncHandler(userController.createUser));
router.get('/:id/sessions', asyncHandler(userController.getUserSessions));

export default router;
