const { UserModel } = require('../../models/user');
const { verifyJWTToken } = require('../../modules/functions');

const checkLogin = async (req, res, next) => {
  try {
    const authError = { status: 401, message: 'please login to your account' };
    const authorization = req?.headers?.authorization;
    if (!authorization) throw authError;

    const token = authorization.split(' ')?.[1];
    if (!token) throw authError;

    const { username } = verifyJWTToken(token);
    const user = await UserModel.findOne({ username }, { password: 0 });
    if (!user) throw authError;
    req.user = user._doc;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
    checkLogin
}