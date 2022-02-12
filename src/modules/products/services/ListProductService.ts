import Product from '@modules/products/typeorm/entities/product';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';
import BaseService from '@shared/BaseService';

class ListProductService extends BaseService<ProductRepository> {
    constructor() {
        super(ProductRepository);
    }

    public async execute(): Promise<Product[]> {
        const products = await this._repository.find();

        return products;
    }
}

export default ListProductService;
