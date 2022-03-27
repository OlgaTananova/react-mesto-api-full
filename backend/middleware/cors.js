const allowedCors = [
  'http://mestobyolga.nomoredomains.work',
  'https://mestobyolga.nomoredomains.work',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsPreflightHandler = (req, res) => {
  const { method } = req;
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.send('Preflight');
  }
};

const corsMainHandler = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};

module.exports = {
  corsPreflightHandler,
  corsMainHandler,
};
