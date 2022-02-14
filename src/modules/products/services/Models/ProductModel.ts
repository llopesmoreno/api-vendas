import { isEmptyOrWhiteSpace, isNull } from '@shared/Validations';

export default abstract class ProductModel {
    readonly name: string;
    readonly price: number;
    readonly quantity: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public invalidName(): boolean {
        return isEmptyOrWhiteSpace(this.name);
    }

    public invalidPrice(): boolean {
        return isNull(this.price) || this.price <= 0;
    }
    public invalidQuantity(): boolean {
        return isNull(this.quantity) || this.quantity < 0;
    }

    public invalidRequest(): boolean {
        return (
            this.invalidName() || this.invalidPrice() || this.invalidQuantity()
        );
    }

    public getRequestErrors(): string[] {
        const errors = [];

        if (this.invalidName()) {
            errors.push('O nome é inválido');
        }
        if (this.invalidPrice()) {
            errors.push('O preço deve ser maior que 0.');
        }
        if (this.invalidQuantity()) {
            errors.push('A quantidade deve ser maior ou igual a 0.');
        }

        return errors;
    }
}
