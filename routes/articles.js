const routerArticles = require('express').Router();
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');
const articleCheckPermission = require('../middlewares/articleCheckPermission');
const { articleData } = require('../middlewares/articleDataValidation');

routerArticles.get('/', getArticles);
routerArticles.post('/', articleData, createArticle);
routerArticles.delete('/:articleId', articleCheckPermission, deleteArticle);

module.exports = routerArticles;
