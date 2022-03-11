import BaseService from '@shared/BaseService';
import { User } from '@modules/users/typeorm/entities/Users';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
}

export default class UpdateProfileService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute({ user_id, name, email }: IRequest): Promise<User> {
        const user = await this.getUser(user_id);

        await this.validateEmail(email, user.email);

        return await this.updateUser(user, name, email);
    }

    private async getUser(user_id: string): Promise<User> {
        const user = await this._repository.findById(user_id);

        if (!user) throw this.getError('Usuário não encontrado', 404);

        return user;
    }

    private async validateEmail(
        newEmail: string,
        currentEmail: string,
    ): Promise<void> {
        if (newEmail === currentEmail) return;

        const user = await this._repository.findByEmail(newEmail);

        if (user)
            throw this.getError(
                'Já existe um usuário cadastrado com este e-mail',
                403,
            );
    }

    private async updateUser(
        user: User,
        name: string,
        email: string,
    ): Promise<User> {
        user.name = name;
        user.email = email;

        await this._repository.save(user);

        return user;
    }
}
