import { Segments, Joi } from 'celebrate';

const UpdateProfilePasswordValidation = () => {
    return {
        [Segments.BODY]: {
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password'))
                .when('password', {
                    //caso exista o campo password na request, ele torna o campo password_confirmation obrigatório
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
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
