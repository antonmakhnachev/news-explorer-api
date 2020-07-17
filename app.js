require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT, SERVER_CONNECT } = require('./config');

const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { celebrateError } = require('./middlewares/checkCelebrateError');

const corsOptions = {
  origin: ['http://localhost:8080'],
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type'],
  credentials: true,
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());


mongoose.connect(SERVER_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('*', cors(corsOptions));

app.use(routes);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(celebrateError);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'Что-то пошло не так' : message });
  next();
});


app.listen(PORT, () => {
  console.log(`Port ${PORT}`);
});
