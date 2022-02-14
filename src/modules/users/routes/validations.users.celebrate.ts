import { Segments, Joi } from 'celebrate';

const CreateUserValidations = () => {
    return {
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    };
};

export { CreateUserValidations };
