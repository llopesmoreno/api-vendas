import BaseService from '@shared/BaseService';
import { User } from '@modules/users/typeorm/entities/Users';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

export default class ShowProfileService extends BaseService<UsersRepository> {
    constructor() {
        super(UsersRepository);
    }

    public async execute(user_id: string): Promise<User> {
        const user = await this._repository.findById(user_id);

        if (!user) throw this.getError('Usuário não encontrado', 404);

        return user;
    }
}
