import { Types } from 'mongoose';
import { Session } from '../models/Session';
import { Teacher } from '../models/Teacher';
import { User } from '../models/User';
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

export const bookSession = async (sessionId: string, userId: string) => {
  const userExists = await User.exists({ _id: userId });

  if (!userExists) {
    throw new AppError('User not found', 404);
  }

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new AppError('Session not found', 404);
  }
  if (session.status !== SessionStatus.AVAILABLE) {
    throw new AppError('Session is not available for booking', 409);
  }

  // The status condition makes the update atomic so two bookings cannot both win.
  const bookedSession = await Session.findOneAndUpdate(
    { _id: sessionId, status: SessionStatus.AVAILABLE },
    { $set: { userId, status: SessionStatus.BOOKED } },
    { new: true, runValidators: true },
  );

  if (!bookedSession) {
    throw new AppError('Session is no longer available for booking', 409);
  }

  return bookedSession;
};
