const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updateUserSquema = Joi.object({
  email, role
});

module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSquema,
};
