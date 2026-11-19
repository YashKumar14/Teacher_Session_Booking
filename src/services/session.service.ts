import { Session } from '../models/Session';
import { Teacher } from '../models/Teacher';
import { AppError } from '../utils/AppError';

export interface CreateSessionInput {
  teacherId: string;
  startTime: string;
  endTime: string;
}

export const createSession = async (input: CreateSessionInput) => {
  const teacherExists = await Teacher.exists({ _id: input.teacherId });

  if (!teacherExists) {
    throw new AppError('Teacher not found', 404);
  }

  return Session.create({
    teacherId: input.teacherId,
    startTime: new Date(input.startTime),
    endTime: new Date(input.endTime),
  });
};
