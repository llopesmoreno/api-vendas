import BaseService from '@shared/BaseService';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { User } from '../typeorm/entities/Users';
import { UserTokens } from '../typeorm/entities/UserTokens';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { hash } from 'bcryptjs';

interface IRequest {
    token: string;
    password: string;
}

export default class ResetUserPassword extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.getUserToken(token);

        const user = await this.getUser(userToken.user_id);

        this.validateToken(userToken);

        await this.updateUserPessword(user, password);
    }

    private async getUserToken(token: string): Promise<UserTokens> {
        const tokenRepository = getCustomRepository(UserTokensRepository);
        const userToken = await tokenRepository.findByToken(token);

        if (!userToken) {
            throw this.getError('Token não encontrado', 404);
        }

        return userToken;
    }

    private async getUser(user_id: string): Promise<User> {
        const user = await this._repository.findById(user_id);

        if (!user) {
            throw this.getError('Usuário não encontrado', 404);
        }

        return user;
    }
    private validateToken(userToken: UserTokens) {
        const createdAt = userToken.created_at;
        const compareDate = addHours(createdAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw this.getError('Token expirado', 401);
        }
    }

    private async updateUserPessword(
        user: User,
        password: string,
    ): Promise<void> {
        user.password = await hash(password, 8);
    }
}
