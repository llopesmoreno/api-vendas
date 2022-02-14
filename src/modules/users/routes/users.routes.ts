import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate } from 'celebrate';
import { CreateUserValidations } from './validations.users.celebrate';

const usersRouter = Router();
const controller = new UsersController();

usersRouter.post('/', celebrate(CreateUserValidations()), controller.create);

export default usersRouter;
