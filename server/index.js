const express = require('express')
const { authHandler } = require('./middlewares/auth.handler')


//entities router
const routersApi = require('./routes/routerApi.js')


const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler')

//middlewares
const cors = require('cors')
require('./utils/auth/')

const myapp = express()

myapp.use(express.json())
const port = 8000

myapp.get('/', (req, res) =>{
  res.send('phonebook server, yeahh!!!!')
})

myapp.get('/login', authHandler, (req, res) => {
  res.send('Yeah!! verify ok');
});

myapp.use(cors());
routersApi(myapp);
myapp.use(logErrors);
myapp.use(boomErrorHandler);
myapp.use(errorHandler);




myapp.listen(port, ()=>{
  console.log(`Listen at ${port} port`);
})
