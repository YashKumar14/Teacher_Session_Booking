import { Router } from 'express';
import sessionController from '../controllers/SessionController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
router.get('/available', asyncHandler(sessionController.getAvailableSessions));
router.post('/', asyncHandler(sessionController.createSession));
router.post('/:id/book', asyncHandler(sessionController.bookSession));
router.patch('/:id/complete', asyncHandler(sessionController.completeSession));

export default router;
