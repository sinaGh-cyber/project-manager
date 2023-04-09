const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function hashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '3 days',
  });
  return token;
}

function verifyJWTToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.username)
    throw { status: 401, message: 'please login to your account' };
  return result;
}

function createUploadPath() {
  let d = new Date();
  const year = d.getFullYear().toString();
  const month = d.getMonth().toString();
  const day = d.getDay().toString();

  const uploadPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'upload',
    year,
    month,
    day
  );
  fs.mkdirSync(uploadPath, { recursive: true });

  return path.join('public', 'upload', year, month, day);
}

function createLinkForFile(fileAddress, req){
 return req.protocol + '://' + req.get('host') + '/' + fileAddress.replace(/[\\\\]/gm, '/')
}

module.exports = {
  hashString,
  tokenGenerator,
  verifyJWTToken,
  createUploadPath,
  createLinkForFile
};
