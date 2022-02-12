import BaseService from '@shared/BaseService';
import Product from '@modules/products/typeorm/entities/product';
import { UpdateProductRequest } from './Models/ProductRequest';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';

export default class UpdateProductService extends BaseService<ProductRepository> {
    constructor() {
        super(ProductRepository);
    }

    public async execute(request: UpdateProductRequest): Promise<Product> {
        this.checkRequest(request);

        await this.checkProductName(request.name, request.id);

        const product = await this.getProductById(request.id);

        const productUpdated = await this.updateProduct(request, product);

        return productUpdated;
    }

    private checkRequest(request: UpdateProductRequest) {
        if (request.invalidRequest()) {
            const errors = request.getRequestErrors();

            throw this.getError(
                'Os dados da requisição são inválidos',
                400,
                errors,
            );
        }
    }

    private async checkProductName(name: string, id: string) {
        const product = await this._repository.findByName(name);
        if (product && product.id !== id) {
            throw this.getError('Já existe um produto com este nome');
        }
    }

    private async getProductById(id: string): Promise<Product> {
        const productExists = await this._repository.findOne(id);

        if (!productExists) {
            throw this.getError('Produto não encontrado');
        }

        return productExists;
    }

    private async updateProduct(
        request: UpdateProductRequest,
        product: Product,
    ): Promise<Product> {
        product.name = request.name;
        product.quantity = request.quantity;
        product.price = request.price;

        await this._repository.save(product);

        return product;
    }
}
