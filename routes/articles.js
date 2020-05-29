const routerArticles = require('express').Router();
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');
const articleCheckPermission = require('../middlewares/articleCheckPermission');


routerArticles.get('/', getArticles);
routerArticles.post('/', createArticle);
routerArticles.delete('/:articleId', articleCheckPermission, deleteArticle);

module.exports = routerArticles;
