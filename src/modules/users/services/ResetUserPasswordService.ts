import { hash } from 'bcryptjs';
import BaseService from '@shared/BaseService';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { User } from '../typeorm/entities/Users';
import { UserTokens } from '../typeorm/entities/UserTokens';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

export default class ResetUserPasswordService extends BaseService<UsersRepository> {
    readonly _userTokenRepository: UserTokensRepository;
    constructor() {
        super(UsersRepository);
        this._userTokenRepository = getCustomRepository(UserTokensRepository);
    }

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.getUserToken(token);

        const user = await this.getUser(userToken.user_id);

        this.validateToken(userToken);

        await this.updateUserPessword(user, password);
        await this.updateUserToken(userToken);
    }

    private async getUserToken(token: string): Promise<UserTokens> {
        const userToken = await this._userTokenRepository.findByToken(token);

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

        if (isAfter(Date.now(), compareDate) || userToken.already_used) {
            throw this.getError('Token expirado', 401);
        }
    }

    private async updateUserPessword(
        user: User,
        password: string,
    ): Promise<void> {
        user.password = await hash(password, 8);
        await this._repository.save(user);
    }

    private async updateUserToken(user_token: UserTokens): Promise<void> {
        user_token.already_used = true;
        await this._userTokenRepository.save(user_token);
    }
}
