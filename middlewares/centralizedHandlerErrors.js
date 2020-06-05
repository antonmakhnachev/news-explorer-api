const NotFoundError = require('../errors/notFoundError');


module.exports.centralizedHandlerErrors = (err, req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};
