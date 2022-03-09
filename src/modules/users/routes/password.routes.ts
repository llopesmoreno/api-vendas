import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as Validations from './validations.users.celebrate';
import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const controller = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
    '/forgot',
    celebrate(Validations.ForgotPasswordValidations()),
    controller.create,
);

passwordRouter.post(
    '/reset',
    celebrate(Validations.ResetPasswordValidations()),
    resetPasswordController.create,
);

export default passwordRouter;
