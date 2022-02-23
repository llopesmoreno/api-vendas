import multer from 'multer';
import { Router } from 'express';
import uploadConfig from '@config/upload';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const avatarRouter = Router();
const controller = new UserAvatarController();
const upload = multer(uploadConfig);

avatarRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    controller.update,
);

export default avatarRouter;
