import { Types } from 'mongoose';

const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

/** Strict ObjectId validation; mongoose also accepts 12-character strings, which we do not want here. */
export const isValidObjectId = (value: string): boolean =>
  OBJECT_ID_PATTERN.test(value) && Types.ObjectId.isValid(value);
