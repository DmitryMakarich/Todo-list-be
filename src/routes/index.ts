import { Router } from 'express';
import { todoRouter } from './todo/todo.routes';
import { userRouter } from './user/user.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

export const routes = router;
