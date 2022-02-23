import { Router } from 'express';
import { celebrate } from 'celebrate';
import avatarRoutes from './avatar.routes';
import UsersController from '../controllers/UsersController';
import { CreateUserValidations } from './validations.users.celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const controller = new UsersController();

usersRouter.get('/', isAuthenticated, controller.index);
usersRouter.post('/', celebrate(CreateUserValidations()), controller.create);

usersRouter.use(avatarRoutes);

export default usersRouter;
