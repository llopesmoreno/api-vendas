import { UserTokens } from '../entities/UserTokens';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserTokens)
export default class UserTokensRepository extends Repository<UserTokens> {
    public async findByToken(token: string): Promise<UserTokens | undefined> {
        const userToken = await this.findOne({
            where: {
                token,
            },
        });
        return userToken;
    }

    public async generate(user_id: string): Promise<UserTokens | undefined> {
        const userToken = this.create({
            user_id,
            already_used: false,
        });

        await this.save(userToken);

        return userToken;
    }
}
