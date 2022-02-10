import { Joi, Segments } from 'celebrate';

const GetProductByIdValidations = () => {
    return {
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    };
};

const CreateProductValidations = () => {
    return {
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).greater(0),
            quantity: Joi.number().greater(-1),
        },
    };
};

const UpdateProductValidations = () => {
    return {
        ...GetProductByIdValidations(),
        ...CreateProductValidations(),
    };
};

const DeleteProductValidations = () => {
    return {
        ...GetProductByIdValidations(),
    };
};

export {
    GetProductByIdValidations,
    CreateProductValidations,
    UpdateProductValidations,
    DeleteProductValidations,
};
