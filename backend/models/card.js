const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String, required: true, minLength: 2, maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const regex = /(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/;
        return regex.test(value);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date, default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
