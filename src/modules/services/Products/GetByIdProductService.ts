import BaseService from '../BaseService';
import Product from '@modules/products/typeorm/entities/product';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';

class GetByIdProductService extends BaseService<ProductRepository> {
    constructor() {
        super(ProductRepository);
    }

    public async execute(id: string): Promise<Product> {
        const product = await this._repository.findOne(id);

        if (!product) throw this.getError('Produto não encontrado.', 404);

        return product;
    }
}

export default GetByIdProductService;
