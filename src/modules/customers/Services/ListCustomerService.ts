import BaseService from '@shared/BaseService';
import { Customer } from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class ListCustomerService extends BaseService<CustomersRepository> {
    constructor() {
        super(CustomersRepository);
    }

    public async execute(): Promise<Customer[]> {
        const customers = await this._repository.find();

        return customers;
    }
}
