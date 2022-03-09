import BaseService from '@shared/BaseService';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/Users';
import { UserTokens } from '../typeorm/entities/UserTokens';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EterealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.getUser(email);

        const userToken = await this.generateToken(user.id);

        await EterealMail.sendMail({
            to: user.email,
            subject: 'apivendas',
            text: `Solicitação de redefinição de senha ${userToken.token}`,
        });
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

        const createdToken = await tokenRepository.findOne({
            user_id,
            already_used: false,
        });

        if (createdToken) return createdToken;

        const token = await tokenRepository.generate(user_id);
        if (!token) throw this.getError('Falha ao gerar o token.', 500);
        return token;
    }
}
