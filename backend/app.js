require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { signinValidationSchema, signupValidationSchema } = require('./middleware/validationSchema');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const login = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const { celebrateErrorHandler, generalErrorHandler } = require('./middleware/errorHandler');

async function start() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    // Приложение не запускается, если оставить эти опции активными
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
}

start()
  .then(() => {
    app.use(cors({
      origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        'http://mestobyolga.nomoredomains.work',
        'https://mestobyolga.nomoredomains.work'],
    }));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(requestLogger);
    app.post('/signin', celebrate(signinValidationSchema), login);
    app.post('/signup', celebrate(signupValidationSchema), createUser);
    app.use(userRouter);
    app.use(cardRouter);
    app.use(auth, (req, res, next) => {
      next(new NotFoundError('Маршрут не найден'));
    });
    app.use(errorLogger);
    app.use(celebrateErrorHandler);
    app.use(generalErrorHandler);
  })
  .catch(() => {
    console.log('Ошибка. Что-то пошло не так.');
    process.exit();
  });
