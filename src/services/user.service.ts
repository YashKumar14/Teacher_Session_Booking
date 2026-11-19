import { User } from '../models/User';
import { AppError } from '../utils/AppError';

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
