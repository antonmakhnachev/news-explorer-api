const NotFoundError = require('../errors/notFoundError');


const centralizedHandlerErrors = new Promise((resolve, reject) => {
  reject(new NotFoundError('dddddd'));
});

module.exports = { centralizedHandlerErrors };
