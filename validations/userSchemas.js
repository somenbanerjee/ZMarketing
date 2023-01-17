const Joi = require("joi");
const { mobile, pan } = require("./customValidations");

const userSchemas = {
  login: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  register: Joi.object().keys({
    introducerCode: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    pan: Joi.string().required().custom(pan),
    mobile: Joi.number().required().custom(mobile),
  }),
};

module.exports = {
  userSchemas,
};
