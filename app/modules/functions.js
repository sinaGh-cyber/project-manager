const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function hashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '3 days',
  });
  return token
}

function verifyJWTToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.username) throw {status: 401,  message: 'please login to your account'} 
  return result
}

module.exports = {
  hashString,
  tokenGenerator,
  verifyJWTToken
};
