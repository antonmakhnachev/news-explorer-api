const routes = require('express').Router();
const routerUsers = require('./users');
const routerArticles = require('./articles');
const { createUser, login } = require('../controllers/users');
const checkingUseEmail = require('../middlewares/checkingUseEmail');
const { validCreateUser, validLogin } = require('../middlewares/userDataValidation');
const auth = require('../middlewares/auth');

routes.post('/signup', validCreateUser, checkingUseEmail, createUser);
routes.post('/signin', validLogin, login);

routes.use(auth);
routes.use('/users', routerUsers);
routes.use('/articles', routerArticles);

module.exports = routes;
