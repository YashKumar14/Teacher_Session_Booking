import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.mongoUri);
  console.info('MongoDB connected successfully');
};
