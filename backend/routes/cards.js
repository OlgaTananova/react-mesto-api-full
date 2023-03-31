const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const router = Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);
router.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .label('Card\'s name')
      .messages({
        'string.base': '{#label} must be a string 2-30 symbols long.',
        'string.min': '{#label} must be a string 2-30 symbols long.',
        'string.max': '{#label} must be a string 2-30 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
        'any.required': 'The field is empty, please, type {#label}.',
      }),
    link: Joi.string().required()
      .pattern(/(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/)
      .label('Image\'s link')
      .messages({
        'string.base': '{#label} must be a string.',
        'string.empty': 'The field is empty, please, type {#label}.',
        'string.pattern': '{#label} does not meet the the link\'s pattern.',
        'string.pattern.base': '{#label} does not meet the the link\'s pattern.',
        'any.required': 'The field is empty, please, type {#label}.',
      }),
  }),
}), createCard);
router.delete('/cards/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .label('Card\'s id')
      .messages({
        'string.base': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'string.length': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'any.required': 'The field is empty, please, type {#label}.',
        'string.hex': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .label('Card\'s id')
      .messages({
        'string.base': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'string.length': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'any.required': 'The field is empty, please, type {#label}.',
        'string.hex': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
        'string.empty': 'The field is empty, please, type {#label}.',
      }),
  }),
}), likeCard);
router.delete(
  '/cards/:cardId/likes',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required()
        .label('Card\'s id')
        .messages({
          'string.base': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
          'string.length': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
          'any.required': 'The field is empty, please, type {#label}.',
          'string.hex': 'There is incorrect format of {#label}. It must be a string of 24 symbols long.',
          'string.empty': 'The field is empty, please, type {#label}.',
        }),
    }),
  }),
  dislikeCard,
);

module.exports = router;
