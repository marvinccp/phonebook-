const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('../../../config')


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const jwtStrategy = new Strategy(options, (payload, done)=>{
  return done(null, payload)
})
console.log(jwtStrategy);
module.exports = jwtStrategy