import { RequestHandler } from 'express';
import { AppError } from '../utils/AppError';
import { isEmail, isNonEmptyString, isNonNegativeNumber } from '../utils/validation';

export const validateCreateUser: RequestHandler = (req, _res, next) => {
  const { fullName, email, phone } = req.body ?? {};
  const errors: string[] = [];

  if (!isNonEmptyString(fullName)) {
    errors.push('fullName must be a non-empty string');
  }
  if (!isEmail(email)) {
    errors.push('email must be a valid email address');
  }
  if (!isNonEmptyString(phone)) {
    errors.push('phone must be a non-empty string');
  }

  if (errors.length > 0) {
    next(new AppError(`Validation failed: ${errors.join('; ')}`, 400));
    return;
  }

  next();
};

export const validateCreateTeacher: RequestHandler = (req, _res, next) => {
  const { fullName, email, specialization, experience } = req.body ?? {};
  const errors: string[] = [];

  if (!isNonEmptyString(fullName)) {
    errors.push('fullName must be a non-empty string');
  }
  if (!isEmail(email)) {
    errors.push('email must be a valid email address');
  }
  if (!isNonEmptyString(specialization)) {
    errors.push('specialization must be a non-empty string');
  }
  if (!isNonNegativeNumber(experience)) {
    errors.push('experience must be a non-negative number');
  }

  if (errors.length > 0) {
    next(new AppError(`Validation failed: ${errors.join('; ')}`, 400));
    return;
  }

  next();
};
