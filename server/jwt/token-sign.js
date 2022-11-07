const jwt = require('jsonwebtoken')

const secret = 'myRedCat'
const payload = {
  sub: 1
}

const signToken = (payload, secret) =>{
  return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)
console.log(token);