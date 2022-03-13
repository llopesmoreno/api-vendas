import BaseService from '@shared/BaseService';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

export default class DeleteCustomerService extends BaseService<CustomersRepository> {
    constructor() {
        super(CustomersRepository);
    }

    public async execute({ id }: IRequest): Promise<void> {
        const customer = await this._repository.findById(id);

        if (!customer) throw this.getError('Cliente não encontrado', 404);

        await this._repository.remove(customer);
    }
}
