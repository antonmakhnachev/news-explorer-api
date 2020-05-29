const Article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId).select('+owner')
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return next();
    })
    .catch(next);
};
