import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate } from 'celebrate';

const usersRouter = Router();
const controller = new UsersController();

usersRouter.post('/', controller.create);

export default usersRouter;
