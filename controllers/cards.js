const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .orFail(() => next(new NotFoundError('The card with the given id was not found.')))
    .then((card) => {
      if (!card.owner.equals(ownerId)) {
        return next(new ForbiddenError('It\'s prohibited to delete another user\'s card'));
      }
      return card.remove()
        .then(() => {
          res.send({ message: 'The card was deleted.' });
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('The card with the given id was not found.');
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('The card with the given id was not found.');
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
