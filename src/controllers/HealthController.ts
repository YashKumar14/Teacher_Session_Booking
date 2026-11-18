import { Request, Response } from 'express';
import { RestController } from './RestController';

class HealthController extends RestController {
  public getHealth = (_req: Request, res: Response): void => {
    this.sendResponse(res, 200, 'Teacher Session Booking API is running');
  };
}

export default new HealthController();
