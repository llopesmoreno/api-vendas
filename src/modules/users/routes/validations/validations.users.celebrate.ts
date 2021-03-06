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

const ForgotPasswordValidations = () => {
    return {
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    };
};

const ResetPasswordValidations = () => {
    return {
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    };
};

export {
    CreateUserValidations,
    ForgotPasswordValidations,
    ResetPasswordValidations,
};
