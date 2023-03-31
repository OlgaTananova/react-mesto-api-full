const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserProfile,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middleware/auth');

const router = Router();

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);
router.get('/users/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required()
      .label('User\'s id')
      .messages({
        'string.base': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'string.length': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'any.required': 'The field is empty, please, type {#label}.',
        'string.hex': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
  }),
}), getUserById);
router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .label('User\'s name')
      .messages({
        'string.base': '{#label} must be a string 2-30 symbols long.',
        'string.min': '{#label} must be a string 2-30 symbols long.',
        'string.max': '{#label} must be a string 2-30 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
    about: Joi.string().required().min(2).max(30)
      .label('User\'s description')
      .messages({
        'string.base': '{#label} must be a string 2-30 symbols long.',
        'string.min': '{#label} must be a string 2-30 symbols long.',
        'string.max': '{#label} must be a string 2-30 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
  }),
}), updateUserProfile);
router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/)
      .label('Avatar')
      .messages({
        'string.base': '{#label} must be a string.',
        'string.empty': 'The field is empty, please, type {#label}.',
        'string.pattern': '{#label} does not meet the the link\'s pattern.',
        'string.pattern.base': '{#label} does not meet the the link\'s pattern.',
      }),
  }),
}), updateUserAvatar);

module.exports = router;
