const  Joi  = require("joi");

const id = Joi.number().integer()
const name = Joi.string().min(3).max(20)

const createCategorySchema = Joi.object({

  id,
  name: name.required()

})

const updateCategorySchema = Joi.object({
  id,
  name
})

const getCategorySchema = Joi.object({
  id:id.required()
})

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
