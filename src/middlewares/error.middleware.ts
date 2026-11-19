import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = `Validation failed: ${Object.values(error.errors)
      .map((fieldError) => fieldError.message)
      .join(', ')}`;
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid value provided for ${error.path}`;
  } else if (error?.code === 11000) {
    statusCode = 409;
    message = 'A record with these unique fields already exists';
  }

  if (env.nodeEnv !== 'production') {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv !== 'production' && { stack: error instanceof Error ? error.stack : undefined }),
  });
};
