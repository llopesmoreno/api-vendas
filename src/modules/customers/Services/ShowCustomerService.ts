import BaseService from '@shared/BaseService';
import { Customer } from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

export default class ShowCustomerService extends BaseService<CustomersRepository> {
    constructor() {
        super(CustomersRepository);
    }

    public async execute({ id }: IRequest): Promise<Customer> {
        const customer = await this._repository.findById(id);

        if (!customer) throw this.getError('Cliente não encontrado', 404);

        return customer;
    }
}
