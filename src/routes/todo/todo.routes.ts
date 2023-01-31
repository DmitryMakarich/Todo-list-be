import { Response, Router, Request } from 'express';
import { body, query } from 'express-validator';
import { ICreateTodoAttributes, ITodo } from '../../db/models/Todo';
import { todoService } from '../../services/todo/todo.service';
import { PaginatedFilter } from '../../helpers/generic.helper';
import { badRequestMiddleware } from '../../middlewares/bad-request.middleware';
import { asyncMiddleware } from '../../middlewares/global-error-handler.middleware';
import { ORDER, SORT_BY } from '../../helpers/sorting.helper';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { IAuthorizedRequest } from '../../interfaces';
import { USER_ROLE } from '../../db/models/User';
import { response } from '../../helpers/response.helper';

const router = Router();

/**
 * Get all todos
 * @route GET /
 * @group todo
 * @param {string} limit.query.required
 * @param {string} page.query.required
 * @param {string} sortBy.query.optional
 * @param {string} order.query.required
 * @returns {object} 200
 * @returns {Error} default - Unexpected error
 */

interface IGetTodosRequest
  extends Request<null, null, null, PaginatedFilter<{ sortBy?: SORT_BY; order: ORDER }>> {}

router.get(
  '/',
  [
    query('sortBy').isIn(Object.values(SORT_BY)).optional(),
    query('order').isIn(Object.values(ORDER)),
    query('limit').isNumeric().toInt(),
    query('page').isNumeric().toInt(),
    badRequestMiddleware,
  ],
  asyncMiddleware(async (req: IGetTodosRequest, res: Response) => {
    const todos = await todoService.getTodos(req.query);

    res.json(todos);
  }),
);

/**
 * Add new todo
 * @route POST /
 * @group todo
 * @param {string} email.body.required
 * @param {string} text.body.required
 * @param {string} user.body.required
 * @returns {object} 200
 * @returns {Error} default - Unexpected error
 */

interface ICreateTodosRequest extends Request<null, null, ICreateTodoAttributes> {}

router.post(
  '/',
  [
    body('email').isString().isEmail(),
    body('text').isString(),
    body('user').isString(),
    badRequestMiddleware,
  ],
  asyncMiddleware(async (req: ICreateTodosRequest, res: Response) => {
    const result = await todoService.addTodo(req.body);

    res.json(result);
  }),
);

/**
 * Update todo
 * @route PATCH /
 * @group todo
 * @param {string} id.body.required
 * @param {string} status.body.required
 * @param {boolean} text.body.required
 * @returns {object} 200
 * @returns {Error} default - Unexpected error
 */

interface IUpdateTodosRequest
  extends IAuthorizedRequest<null, null, Pick<ITodo, 'id' | 'text' | 'status'>> {}

router.patch(
  '/',
  [
    authMiddleware,
    body('id').isString().isUUID('4'),
    body('text').isString(),
    body('status').isBoolean(),
    badRequestMiddleware,
  ],
  asyncMiddleware(async (req: IUpdateTodosRequest, res: Response) => {
    if (req.role !== USER_ROLE.ADMIN) return response.forbidden(res);

    const result = await todoService.updateTodo(req.body);

    res.json(result);
  }),
);

export const todoRouter = router;
