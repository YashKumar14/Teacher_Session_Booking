import { Request, Response } from 'express';
import { RestController } from './RestController';
import { AppError } from '../utils/AppError';
import {
  bookSession,
  createSession,
  getAvailableSessions,
} from '../services/session.service';

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

  public getAvailableSessions = async (_req: Request, res: Response): Promise<void> => {
    const sessions = await getAvailableSessions(res.locals.requestedDate as Date);

    this.sendResponse(res, 200, 'Available sessions retrieved successfully', sessions);
  };

  public bookSession = async (req: Request, res: Response): Promise<void> => {
    const session = await bookSession(req.params.id, req.body.userId);

    this.sendResponse(res, 200, 'Session booked successfully', {
      id: session._id,
      teacherId: session.teacherId,
      userId: session.userId,
      startTime: session.startTime,
      endTime: session.endTime,
      status: session.status,
    });
  };

  public completeSession = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('Complete Session API is not implemented yet', 501);
  };
}

export default new SessionController();
