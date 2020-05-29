const regexUrl = new RegExp(/^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/);
const { celebrate, Joi } = require('celebrate');

module.exports.articleData = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(regexUrl),
    image: Joi.string().required().regex(regexUrl),
  }),
});
