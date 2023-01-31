import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { USER_ROLE } from 'src/db/models/User';

export interface IAuthorizedRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
  role: USER_ROLE;
}
