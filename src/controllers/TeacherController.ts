import { Request, Response } from 'express';
import { RestController } from './RestController';
import { createTeacher } from '../services/teacher.service';

class TeacherController extends RestController {
  public createTeacher = async (req: Request, res: Response): Promise<void> => {
    const teacher = await createTeacher({
      fullName: req.body.fullName,
      email: req.body.email,
      specialization: req.body.specialization,
      experience: req.body.experience,
    });

    this.sendCreated(res, 'Teacher created successfully', {
      id: teacher._id,
      fullName: teacher.fullName,
      email: teacher.email,
      specialization: teacher.specialization,
      experience: teacher.experience,
      createdAt: teacher.createdAt,
    });
  };
}

export default new TeacherController();
