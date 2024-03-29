const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Jacques-Yves Cousteau',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => {
        const regex = /(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/;
        return regex.test(value);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('There are incorrect password or email.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('There are incorrect password or email.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
