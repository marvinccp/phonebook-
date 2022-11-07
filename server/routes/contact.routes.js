const express = require('express');
const router = express.Router();

//autenticación y permisos
const passport = require('passport')
const { checkRoles } = require('../middlewares/auth.handler')

const validator = require('../middlewares/validator.handler');
const {
  createContactSchema,
  getContactSchema,
  updateContactSquema,
} = require('../joi.schemas/contacts.schema');

//instance of class ContactsService

const ContactsService = require('../services/contacts.service');
const service = new ContactsService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    async (req, res, next) => {
      try {
        const contacts = await service.find();
        res.json(contacts);
      } catch (error) {
        next(error);
      }
    }
  )

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    validator(createContactSchema, 'body'),
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
    validator(getContactSchema, 'params'),
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
    validator(getContactSchema, 'params'),
    validator(updateContactSquema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const data = req.body;
        const updateContact = await service.update(id, data);
        res.json(updateContact);
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
        const contactDeleted = await service.delete(id);
        res.json(contactDeleted);
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
