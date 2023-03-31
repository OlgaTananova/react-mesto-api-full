const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('The users were not found.');
      }
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};
const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('The user with the given id was not found.');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Unable to show the user\'s info, probably, you need to login.');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('The user has already existed.');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(201).send({
        data: {
          name, about, avatar, email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('You typed incorrect data.'));
      } else {
        next(err);
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;
  const id = req.user._id;
  if (!name || !about) {
    throw new BadRequestError('You typed incorrect data to update the user\'s info.');
  }
  User.findByIdAndUpdate(id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  if (!avatar) {
    throw new BadRequestError('You typed incorrect data to update the user\'s avatar.');
  }
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
};
