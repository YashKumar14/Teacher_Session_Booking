import { Request, Response } from 'express';
import { RestController } from './RestController';
import { AppError } from '../utils/AppError';
import { createUser } from '../services/user.service';

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

  public getUserSessions = async (_req: Request, _res: Response): Promise<void> => {
    throw new AppError('User Session List API is not implemented yet', 501);
  };
}

export default new UserController();
