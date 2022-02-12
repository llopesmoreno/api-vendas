import BaseService from '@shared/BaseService';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';

export default class DeleteProductService extends BaseService<ProductRepository> {
    constructor() {
        super(ProductRepository);
    }

    public async execute(id: string): Promise<void> {
        const product = await this._repository.findOne(id);
        if (!product) {
            throw this.getError('Produto não encontrado.', 404);
        }

        await this._repository.remove(product);
    }
}
