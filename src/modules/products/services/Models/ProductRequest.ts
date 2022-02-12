import ProductModel from './ProductModel';

class CreateProductRequest extends ProductModel {}

class UpdateProductRequest extends ProductModel {
    readonly id: string;

    constructor(name: string, price: number, quantity: number, id: string) {
        super(name, price, quantity);
        this.id = id;
    }

    public override invalidRequest(): boolean {
        return super.invalidRequest() || this.invalidId();
    }

    private invalidId(): boolean {
        return this.id === null || this.id === undefined || this.id === '';
    }

    public override getRequestErrors(): string[] {
        const errors = super.getRequestErrors();
        if (this.invalidId()) {
            errors.push('O id é inválido');
        }

        return errors;
    }
}

export { CreateProductRequest, UpdateProductRequest };
