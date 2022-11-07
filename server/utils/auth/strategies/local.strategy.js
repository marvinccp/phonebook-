const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const service = new UserService();

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

//puedo pasar un objeto con options, entre otros para cambiar
//el nombre de los campos
const options = {
  usernameField: 'email'
}

const localStrategy = new Strategy(options, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    //verifico si hay usuario o no, podemos usar boom para manejar el error
    if (!user) {
      done(boom.unauthorized('your credentials are incorrect'), false);
    }
    //verifico si el password es correcto utilizando bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      done(boom.unauthorized('your credentials are incorrect'), false);
    }

    delete user.dataValues.password
    done(null, user)
  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;
