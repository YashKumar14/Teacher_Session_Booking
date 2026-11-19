import { Request, Response } from 'express';
import { RestController } from './RestController';
import { AppError } from '../utils/AppError';
import { createSession } from '../services/session.service';

class SessionController extends RestController {
  public createSession = async (req: Request, res: Response): Promise<void> => {
    const session = await createSession({
      teacherId: req.body.teacherId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    this.sendCreated(res, 'Session created successfully', {
      id: session._id,
      teacherId: session.teacherId,
      userId: session.userId,
      startTime: session.startTime,
      endTime: session.endTime,
      status: session.status,
    });
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
