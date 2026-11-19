import { RequestHandler } from 'express';
import { AppError } from '../utils/AppError';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const validateCreateUser: RequestHandler = (req, _res, next) => {
  const { fullName, email, phone } = req.body ?? {};
  const errors: string[] = [];

  if (!isNonEmptyString(fullName)) {
    errors.push('fullName must be a non-empty string');
  }
  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email.trim())) {
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
