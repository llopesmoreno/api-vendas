import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as Validations from './validations.users.celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const controller = new ForgotPasswordController();

passwordRouter.post(
    '/forgot',
    celebrate(Validations.ForgotPasswordValidations()),
    controller.create,
);

passwordRouter.put(
    '/reset',
    celebrate(Validations.ResetPasswordValidations()),
    controller.create,
);

export default passwordRouter;
