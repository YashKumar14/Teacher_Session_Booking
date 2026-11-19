import { Types } from 'mongoose';
import { Session } from '../models/Session';
import { Teacher } from '../models/Teacher';
import { AppError } from '../utils/AppError';
import { SessionStatus } from '../types/session.types';
import { getUtcDayRange } from '../utils/date';

export interface CreateSessionInput {
  teacherId: string;
  startTime: string;
  endTime: string;
}

export interface AvailableSession {
  _id: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: SessionStatus;
  teacher: {
    _id: Types.ObjectId;
    fullName: string;
    specialization: string;
  } | null;
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

export const getAvailableSessions = async (date: Date): Promise<AvailableSession[]> => {
  const { start, end } = getUtcDayRange(date);

  return Session.aggregate<AvailableSession>([
    {
      $match: {
        status: SessionStatus.AVAILABLE,
        startTime: { $gte: start, $lt: end },
      },
    },
    { $sort: { startTime: 1 } },
    {
      $lookup: {
        from: 'teachers',
        localField: 'teacherId',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    { $unwind: { path: '$teacher', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        startTime: 1,
        endTime: 1,
        status: 1,
        teacher: {
          _id: '$teacher._id',
          fullName: '$teacher.fullName',
          specialization: '$teacher.specialization',
        },
      },
    },
  ]);
};
