import { Router } from 'express';
import sessionController from '../controllers/SessionController';
import { asyncHandler } from '../utils/asyncHandler';
import {
  validateCreateSession,
  validateDateTimestamp,
} from '../middlewares/validation.middleware';

const router = Router();
router.get(
  '/available',
  validateDateTimestamp,
  asyncHandler(sessionController.getAvailableSessions),
);
router.post('/', validateCreateSession, asyncHandler(sessionController.createSession));
router.post('/:id/book', asyncHandler(sessionController.bookSession));
router.patch('/:id/complete', asyncHandler(sessionController.completeSession));

export default router;
