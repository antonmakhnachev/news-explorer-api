const regexEmail = new RegExp(/^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/);
const { celebrate, Joi } = require('celebrate');

module.exports.validCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(regexEmail),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(regexEmail),
    password: Joi.string().required().min(8),
  }),
});
