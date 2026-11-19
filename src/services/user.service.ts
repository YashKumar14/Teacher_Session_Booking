import { Types } from 'mongoose';
import { Session } from '../models/Session';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import { SessionStatus } from '../types/session.types';

export interface CreateUserInput {
  fullName: string;
  email: string;
  phone: string;
}

const isDuplicateKeyError = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  error.code === 11000;

export const createUser = async (input: CreateUserInput) => {
  try {
    return await User.create({
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new AppError('A user with this email already exists', 409);
    }
    throw error;
  }
};

export const getUserSessions = async (userId: string) => {
  const userExists = await User.exists({ _id: userId });

  if (!userExists) {
    throw new AppError('User not found', 404);
  }

  const [result] = await Session.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
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
      $facet: {
        upcomingSessions: [
          { $match: { status: SessionStatus.BOOKED } },
          { $sort: { startTime: 1 } },
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
        ],
        completedSessions: [
          { $match: { status: SessionStatus.COMPLETED } },
          { $sort: { completedAt: -1 } },
          {
            $project: {
              _id: 1,
              startTime: 1,
              endTime: 1,
              status: 1,
              completedAt: 1,
              teacher: {
                _id: '$teacher._id',
                fullName: '$teacher.fullName',
                specialization: '$teacher.specialization',
              },
            },
          },
        ],
      },
    },
  ]);

  return (
    result ?? {
      upcomingSessions: [],
      completedSessions: [],
    }
  );
};
