import { Response, Router, Request } from 'express';
import { body } from 'express-validator';
import { ICreateUserAttributes } from '../../db/models/User';
import { response } from '../../helpers/response.helper';
import { badRequestMiddleware } from '../../middlewares/bad-request.middleware';
import { asyncMiddleware } from '../../middlewares/global-error-handler.middleware';
import { userService } from '../../services/user/user.service';

const router = Router();

/**
 * Sign in user
 * @route POST /login
 * @group user
 * @param {string} name.body.required
 * @param {string} password.body.required
 * @returns {object} 200
 * @returns {Error} default - Unexpected error
 */

interface ILoginRequest extends Request<null, null, ICreateUserAttributes> {}

router.post(
  '/login',
  [body('name').isString(), body('password').isString(), badRequestMiddleware],
  asyncMiddleware(async (req: ILoginRequest, res: Response) => {
    const result = await userService.login(req.body);

    if ('error' in result) return response.internalServerError(res, result);
    if ('inCorrectPassword' in result) return response.unauthorized(res, result);

    res.json(result);
  }),
);

/**
 * Sign up user
 * @route POST /register
 * @group user
 * @param {string} name.body.required
 * @param {string} password.body.required
 * @param {string} confirmPassword.body.required
 * @returns {object} 200
 * @returns {Error} default - Unexpected error
 */

interface IRegisterRequest
  extends Request<
    null,
    null,
    ICreateUserAttributes & {
      confirmPassword: string;
    }
  > {}

router.post(
  '/register',
  [
    body('name').isString(),
    body('password').isString(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      return true;
    }),
    badRequestMiddleware,
  ],
  asyncMiddleware(async (req: IRegisterRequest, res: Response) => {
    const result = await userService.register({ ...req.body });

    if ('error' in result) return response.internalServerError(res, result);

    res.json(result);
  }),
);

export const userRouter = router;
