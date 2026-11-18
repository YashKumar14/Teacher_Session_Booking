import { Request, Response } from 'express';
import { RestController } from './RestController';
import { AppError } from '../utils/AppError';

class UserController extends RestController {
  // Implemented in a later milestone: create user and list a user's sessions.
  public createUser = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('Create User API is not implemented yet', 501);
  };

  public getUserSessions = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('User Session List API is not implemented yet', 501);
  };
}

export default new UserController();
