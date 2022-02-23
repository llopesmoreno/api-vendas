import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import BaseService from '@shared/BaseService';
import { User } from '../../typeorm/entities/Users';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.getUser(user_id);

        await this.checkUserAvatar(user);

        await this.saveUser(user, avatarFilename);

        return user;
    }

    private async getUser(userId: string): Promise<User> {
        const user = await this._repository.findById(userId);
        if (!user) throw this.getError('Usuário não encontrado', 404);
        return user;
    }

    private async checkUserAvatar(user: User): Promise<void> {
        if (!user.avatar) return;

        const userAvatarFilePath = path.join(
            uploadConfig.directory,
            user.avatar,
        );

        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists) {
            await fs.promises.unlink(userAvatarFilePath);
        }
    }

    private async saveUser(user: User, avatarFilename: string): Promise<void> {
        user.avatar = avatarFilename;

        this._repository.save(user);
    }
}
