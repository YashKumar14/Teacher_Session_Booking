import { Request, Response } from 'express';
import { RestController } from './RestController';
import { AppError } from '../utils/AppError';

class SessionController extends RestController {
  // Session endpoints will be implemented one milestone at a time.
  public createSession = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('Create Session API is not implemented yet', 501);
  };

  public getAvailableSessions = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('Available Sessions API is not implemented yet', 501);
  };

  public bookSession = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('Book Session API is not implemented yet', 501);
  };

  public completeSession = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('Complete Session API is not implemented yet', 501);
  };
}

export default new SessionController();
