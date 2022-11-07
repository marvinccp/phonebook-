const boom = require('@hapi/boom');
const { config } = require('../config');
console.log(config.apiKey);

const authHandler = (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('access denied'));
  }
};

const checkAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
};


const checkRoles = (...roles) => {

  return (req, res, next)=>{
    const user = req.user;
    console.log(roles)
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }

};

module.exports = { authHandler, checkAdminRole, checkRoles };
