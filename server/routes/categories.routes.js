const express = require('express');
const router = express.Router();
const CategoryService = require('../services/categories.service');
const service = new CategoryService();
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('../joi.schemas/categories.schema');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport')
const { checkRoles } = require('../middlewares/auth.handler')


router
  .route('/')
  .get(
   
    async (req, res) => {
      const categories = await service.find();
      res.send(categories);
    }
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newCategory = await service.create(body);
        res.json(newCategory);
      } catch (error) {
        next(error);
      }
    }
  );

//routes with query params

router
  .route('/:id')
  .get(
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const category = await service.findOne(id);
        res.json(category);
      } catch (error) {
        next(error);
      }
    }
  )
  .patch(
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const updateCategory = await service.update(id, body);
        res.send(updateCategory);
      } catch (error) {
        next(error);
      }
    }
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const deletedCategory = await service.delete(id);
        res.json(deletedCategory);
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
