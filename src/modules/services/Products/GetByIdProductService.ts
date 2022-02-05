import Product from '@modules/products/typeorm/entities/product';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';
import BaseService from '../BaseService';

interface IRequest {
    id: number;
}

class GetByIdProductService extends BaseService<ProductRepository> {
    constructor() {
        super(ProductRepository);
    }

    public async execute({ id }: IRequest): Promise<Product> {
        const product = await this._repository.findOne(id);

        if (!product) throw this.getError('Produto não encontrado.');

        return product;
    }
}

export default GetByIdProductService;
