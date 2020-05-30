const { isCelebrate } = require('celebrate');
const CelebrateError = require('../errors/celebrateError');

module.exports.celebrateError = (err, req, res, next) => {
  if (isCelebrate(err)) {
    const errorField = err.joi.details[0].context.key;
    throw new CelebrateError(`Некорректные данные в поле ${errorField}`);
  }
};
