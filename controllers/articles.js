const Article = require('../models/article');


// добавление новости в избранное
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const userId = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner: userId,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

// получение новостей из избранного
module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((article) => res.send({ data: article }))
    .catch(next);
};

// удаление новости
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findByIdAndRemove(articleId)
    .then((article) => res.send({ data: article }))
    .catch(next);
};
