import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '@modules/users/services/UserServices';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new UpdateUserAvatarService();

        const user = await service.execute({
            user_id: request.user.id,
            avatarFilename: request.file?.filename ?? '',
        });

        return response.json(user);
    }
}
