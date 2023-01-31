import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { response } from '../helpers/response.helper';

export const badRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response.badRequest(res, { errors: validation.array() });
  }

  next();
};
