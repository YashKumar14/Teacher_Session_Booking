import { Request, Response } from 'express';
import { RestController } from './RestController';
import { AppError } from '../utils/AppError';
import { createUser, getUserSessions } from '../services/user.service';

class UserController extends RestController {
  public createUser = async (req: Request, res: Response): Promise<void> => {
    const user = await createUser({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
    });

    this.sendCreated(res, 'User created successfully', {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    });
  };

  public getUserSessions = async (req: Request, res: Response): Promise<void> => {
    const sessions = await getUserSessions(req.params.id);

    this.sendResponse(res, 200, 'User sessions retrieved successfully', sessions);
  };
}

export default new UserController();
