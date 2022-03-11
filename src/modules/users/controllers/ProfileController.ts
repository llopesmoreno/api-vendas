import { Request, Response } from 'express';
import {
    ShowProfileService,
    UpdateProfileService,
    UpdateUserPasswordService,
} from '@modules/users/services/UserServices';

export default class ProfileController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new ShowProfileService();

        const profile = await service.execute(request.user.id);

        return response.json(profile);
    }

    public async updateProfile(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new UpdateProfileService();

        const { name, email } = request.body;

        const profile = await service.execute({
            user_id: request.user.id,
            name,
            email,
        });

        return response.json(profile);
    }

    public async updatePassword(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const service = new UpdateUserPasswordService();

        const { password, password_confirmation, old_password } = request.body;

        const profile = await service.execute({
            user_id: request.user.id,
            password,
            password_confirmation,
            old_password,
        });

        return response.json(profile);
    }
}
