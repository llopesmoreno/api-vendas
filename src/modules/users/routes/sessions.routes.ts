import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate } from 'celebrate';

const usersRouter = Router();
const controller = new SessionsController();

usersRouter.post('/', controller.create);

export default usersRouter;
