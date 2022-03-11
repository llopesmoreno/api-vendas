import { Router } from 'express';
import { celebrate } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import {
    UpdateProfilePasswordValidation,
    UpdateProfileValidation,
} from './validations/validations.profile.celebrate';

const profileRouter = Router();
const controller = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', controller.index);

profileRouter.post(
    '/update-profile',
    celebrate(UpdateProfileValidation()),
    controller.updateProfile,
);

profileRouter.put(
    '/update-password',
    celebrate(UpdateProfilePasswordValidation()),
    controller.updatePassword,
);

export default profileRouter;
