const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_SECRET_KEY } = require('../config');

// создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => user.omitPrivate())
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// получение данных пользователя
module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch(next);
};


// вход в систему
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ user, message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};
