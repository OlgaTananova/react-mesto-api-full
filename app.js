require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  signinValidationSchema,
  signupValidationSchema,
} = require('./middleware/validationSchema');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, logout } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const {
  celebrateErrorHandler,
  generalErrorHandler,
} = require('./middleware/errorHandler');

const { NODE_ENV, USER, PASSWORD } = process.env;
const MONGO_URI = NODE_ENV === 'production' ? `mongodb+srv://${USER}:${PASSWORD}@cluster0.ytxayd2.mongodb.net/mesto`
  : `mongodb+srv://${USER}:${PASSWORD}@cluster0.ytxayd2.mongodb.net/test`;

async function start() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
}

start()
  .then(() => {
    app.use(cors({
      origin: ['http://localhost:3001', 'http://localhost:3000', 'https://olgatananova.github.io/react-mesto-auth'],
      credentials: true,
      exposedHeaders: ['set-cookie'],
    }));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(requestLogger);
    app.post('/signin', celebrate(signinValidationSchema), login);
    app.post('/signup', celebrate(signupValidationSchema), createUser);
    app.post('/signout', auth, logout);
    app.use(userRouter);
    app.use(cardRouter);
    app.use(auth, (req, res, next) => {
      next(new NotFoundError('The page was not found.'));
    });
    app.use(errorLogger);
    app.use(celebrateErrorHandler);
    app.use(generalErrorHandler);
  })
  .catch(() => {
    console.log('Error, something went wrong...');
    process.exit();
  });
