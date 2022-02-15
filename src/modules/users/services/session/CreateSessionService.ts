import { compare } from 'bcryptjs';
import BaseService from '@shared/BaseService';
import { sign as signJwt } from 'jsonwebtoken';
import auth from '@config/auth';
import { User } from '../../typeorm/entities/Users';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute(email: string, pass: string): Promise<IResponse> {
        const user = await this.getUserByEmail(email);

        await this.validatePass(user, pass);

        const token = signJwt({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expireIn,
        });

        return { user, token };
    }

    private async getUserByEmail(email: string): Promise<User> {
        const user = await this._repository.findByEmail(email);

        if (!user) throw this.getError('E-mail ou senha inválidos', 401);

        return user;
    }

    private async validatePass(user: User, pass: string) {
        const passConfirmed = await compare(pass, user.password);

        if (!passConfirmed)
            throw this.getError('E-mail ou senha inválidos', 401);
    }
}
