const express = require('express')

//entities routes
const categoryRouter = require('./categories.routes')
const contactRouter = require('./contact.routes')
const userRouter = require('./user.routes')
const authRouter = require('./auth.routes')

const routersApi = (app) =>{

  const router = express.Router()
  app.use('/phonebook/', router)
  router.use('/categories', categoryRouter )
  router.use('/contacts', contactRouter);
  router.use('/users', userRouter);
  router.use('/auth', authRouter)


}

module.exports = routersApi