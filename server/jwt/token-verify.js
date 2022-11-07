const jwt = require('jsonwebtoken');

const secret = 'myRedCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY1OTcwODM4MH0.WqaxiR7DEE27zMxIi66fu7NxNxEqaelD3HkkOXukgCk';

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
