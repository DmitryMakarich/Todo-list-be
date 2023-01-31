import { Response } from 'express';

type CustomError = {
  msg?: string;
  [key: string]: any;
};

class ResponseHelper {
  badRequest(res: Response, error?: CustomError) {
    res.status(400).json(error);
  }

  unauthorized(res: Response, error?: CustomError) {
    res.status(401).json(error);
  }

  forbidden(res: Response, error?: CustomError) {
    res.status(403).json(error);
  }

  notFound(res: Response, error?: CustomError) {
    res.status(404).json(error);
  }

  internalServerError(res: Response, error?: CustomError) {
    res.status(500).json(error);
  }
}

export const response = new ResponseHelper();
