const Joi = require('joi');

const id = Joi.number().integer();
const contactName = Joi.string().min(3).max(100);
const phone = Joi.number().integer().min(7);
const isFavorite = Joi.boolean();
const categoryId = Joi.number().integer()

const createContactSchema = Joi.object({
  id,
  contactName: contactName.required(),
  phone: phone.required(),
  isFavorite: isFavorite.required(),
  categoryId: categoryId
});

const getContactSchema = Joi.object({
  id: id.required(),
});

const updateContactSquema = Joi.object({
  id,
  contactName,
  phone,
  isFavorite,
  categoryId,
});

module.exports = {
  createContactSchema,
  getContactSchema,
  updateContactSquema,
};
