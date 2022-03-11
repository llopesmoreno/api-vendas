import { Segments, Joi } from 'celebrate';

const UpdateProfilePasswordValidation = () => {
    return {
        [Segments.BODY]: {
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
            old_password: Joi.string().required(),
        },
    };
};

const UpdateProfileValidation = () => {
    return {
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            name: Joi.string().required(),
        },
    };
};

export { UpdateProfilePasswordValidation, UpdateProfileValidation };
