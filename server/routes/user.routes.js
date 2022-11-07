const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator.handler');
const {
  createUserSchema,
  getUserSchema,
  updateUserSquema,
} = require('../joi.schemas/users.schema');

//instance of class usersService

const UserService = require('../services/user.service');
const { checkRoles } = require('../middlewares/auth.handler');
const passport = require('passport');
const service = new UserService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    async (req, res, next) => {
      try {
        const users = await service.find();
        res.json(users);
      } catch (error) {
        next(error);
      }
    }
  )

  router.post('/',
    validator(createUserSchema, 'body'),
    async (req, res, next) => {
      try {
        const data = req.body;
        const newContact = await service.create(data);
        res.json(newContact);
      } catch (error) {
        next(error);
      }
    }
  );


//routes with query params

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    validator(getUserSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        console.log(id)
        const contact = await service.findOne(id);
        res.json(contact);
      } catch (error) {
        next(error);
      }
    }
  )

  router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    validator(getUserSchema, 'params'),
    validator(updateUserSquema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = req.body;
        const updateUser = await service.update(id, data);
        res.json(updateUser);
      } catch (error) {
        next(error);
      }
    }
  )

  router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const userDeleted = await service.delete(id);
        res.json(userDeleted);
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
