import BaseService from '@shared/BaseService';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/Users';
import { UserTokens } from '../typeorm/entities/UserTokens';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute({ email }: IRequest): Promise<UserTokens> {
        const user = await this.getUser(email);

        const token = await this.generateToken(user.id);

        return token;
    }

    private async getUser(email: string): Promise<User> {
        const user = await this._repository.findByEmail(email);

        if (!user) {
            throw this.getError('Usuário não encontrado', 404);
        }

        return user;
    }

    private async generateToken(user_id: string): Promise<UserTokens> {
        const tokenRepository = getCustomRepository(UserTokensRepository);

        const token = await tokenRepository.generate(user_id);
        if (!token) throw this.getError('Falha ao gerar o token.', 500);
        return token;
    }
}
