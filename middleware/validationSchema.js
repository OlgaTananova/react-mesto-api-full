const { Joi } = require('celebrate');

const signinValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().label('Email').required()
      .messages({
        'string.base': 'The field must have {#label}.',
        'string.email': 'There is incorrect format of {#label}.',
        'any.required': 'You need to type {#label}.',
        'string.empty': 'Empty field, you need to type {#label}.',
      }),
    password: Joi.string().label('Password').required()
      .messages({
        'string.base': 'There is incorrect format of {#label}. It must be a string.',
        'any.required': 'You have not typed {#label}, please, type {#label}.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
  }),
};

const signupValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).label('User\'s name')
      .default('Jacques-Yves Cousteau')
      .messages({
        'string.base': '{#label} must be a string 2-30 symbols long.',
        'string.min': '{#label} must be a string 2-30 symbols long.',
        'string.max': '{#label} must be a string 2-30 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
    about: Joi.string().min(2).max(30).label('User\'s description')
      .default('Explorer')
      .messages({
        'string.base': '{#label} must be a string 2-30 symbols long.',
        'string.min': '{#label} must be a string 2-30 symbols long.',
        'string.max': '{#label} must be a string 2-30 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
    avatar: Joi.string().label('Avatar').pattern(/(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .messages({
        'string.base': '{#label} must be a string.',
        'string.empty': 'The field is empty, please, type {#label}.',
        'string.pattern': '{#label} does not meet the the link\'s pattern.',
        'string.pattern.base': '{#label} does not meet the the link\'s pattern.',
      }),
    email: Joi.string().required().email().label('Email')
      .messages({
        'string.base': 'The field must be a string with {#label}.',
        'string.email': 'There is incorrect format of {#label}.',
        'any.required': 'Please, type {#label}.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
    password: Joi.string().required().label('Password')
      .messages({
        'string.base': 'There is incorrect format of {#label}. It must be a string.',
        'any.required': '{#label} was not typed, please, type {#label}.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
  }),
};

module.exports = {
  signinValidationSchema,
  signupValidationSchema,
};
