import { Joi, Segments } from 'celebrate';

const ShowCustomerValidations = () => {
    return {
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    };
};

const CreateCustomerValidations = () => {
    return {
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email(),
        },
    };
};

const UpdateCustomerValidations = () => {
    return {
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email(),
        },
    };
};

const DeleteCustomerValidations = () => {
    return {
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    };
};

export {
    ShowCustomerValidations,
    CreateCustomerValidations,
    UpdateCustomerValidations,
    DeleteCustomerValidations,
};
