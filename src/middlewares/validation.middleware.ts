import { RequestHandler } from 'express';
import { AppError } from '../utils/AppError';
import { parseDateValue } from '../utils/date';
import { isValidObjectId } from '../utils/objectId';
import {
  isEmail,
  isIsoDateTime,
  isNonEmptyString,
  isNonNegativeNumber,
} from '../utils/validation';

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

export const validateCreateSession: RequestHandler = (req, _res, next) => {
  const { teacherId, startTime, endTime } = req.body ?? {};
  const errors: string[] = [];

  if (!isNonEmptyString(teacherId) || !isValidObjectId(teacherId)) {
    errors.push('teacherId must be a valid ObjectId');
  }
  if (!isIsoDateTime(startTime)) {
    errors.push('startTime must be an ISO 8601 date-time with a timezone');
  }
  if (!isIsoDateTime(endTime)) {
    errors.push('endTime must be an ISO 8601 date-time with a timezone');
  }
  if (
    isIsoDateTime(startTime) &&
    isIsoDateTime(endTime) &&
    Date.parse(endTime) <= Date.parse(startTime)
  ) {
    errors.push('endTime must be greater than startTime');
  }

  if (errors.length > 0) {
    next(new AppError(`Validation failed: ${errors.join('; ')}`, 400));
    return;
  }

  next();
};

export const validateDateTimestamp: RequestHandler = (req, res, next) => {
  const date = parseDateValue(req.query.dateTimestamp);

  if (!date) {
    next(
      new AppError(
        'dateTimestamp must be an ISO 8601 date or epoch milliseconds',
        400,
      ),
    );
    return;
  }

  res.locals.requestedDate = date;
  next();
};
