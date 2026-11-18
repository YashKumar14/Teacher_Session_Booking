import { Response } from 'express';

/** Shared HTTP response helpers for all REST controllers. */
export abstract class RestController {
  protected sendResponse<T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
  ): Response {
    return res.status(statusCode).json({
      success: statusCode >= 200 && statusCode < 300,
      message,
      ...(data !== undefined ? { data } : {}),
    });
  }

  protected sendCreated<T>(res: Response, message: string, data?: T): Response {
    return this.sendResponse(res, 201, message, data);
  }

  protected sendNoContent(res: Response): void {
    res.status(204).send();
  }
}
