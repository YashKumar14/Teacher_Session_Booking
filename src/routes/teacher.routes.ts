import { Router } from 'express';
import teacherController from '../controllers/TeacherController';
import { asyncHandler } from '../utils/asyncHandler';
import { validateCreateTeacher } from '../middlewares/validation.middleware';

const router = Router();
router.post('/', validateCreateTeacher, asyncHandler(teacherController.createTeacher));

export default router;
