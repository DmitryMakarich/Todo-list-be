import { NextFunction, Request, Response } from 'express';

import { logger } from '../helpers/logger.helper';
import { response } from '../helpers/response.helper';

export const asyncMiddleware = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const globalErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  logger.error(`Unhandled server error: ${err.message}`, {
    method: req.method,
    path: req.path,
    stack: err.stack,
    query,
    body,
  });

  return response.internalServerError(res, err);
};
