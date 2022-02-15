import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate } from 'celebrate';
import { CreateUserValidations } from './validations.users.celebrate';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const controller = new UsersController();

usersRouter.get('/', isAuthenticated, controller.index);
usersRouter.post('/', celebrate(CreateUserValidations()), controller.create);

export default usersRouter;
