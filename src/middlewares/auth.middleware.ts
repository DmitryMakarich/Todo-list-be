import { Request, Response, NextFunction } from 'express';
import { response } from '../helpers/response.helper';
import { jwtService } from '../services/jwt.service';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization || req.headers.Authorization; // 'x-access-token'
  let bearer: string | null = null;
  if (typeof authorization === 'string') {
    bearer = authorization && authorization.startsWith('Bearer ') ? authorization : null;
  }
  const token = bearer ? bearer.split('Bearer ')[1] : null;

  if (!token) {
    return response.unauthorized(res, { error: 'INVALID_TOKEN', msg: 'token not set' });
  }

  try {
    const { id, role } = jwtService.verify(token);

    (req as any).userId = id;
    (req as any).role = role;
    next();
  } catch (err: any) {
    return response.unauthorized(res, err);
  }
};
