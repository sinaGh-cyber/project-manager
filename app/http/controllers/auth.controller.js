const { UserModel } = require('../../models/user');
const { hashString } = require('../../modules/functions');

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hash_password = hashString(password);
      const newUser = await UserModel.create({
        username,
        email,
        password: hash_password,
        mobile,
      }).catch((err) => {
        if (err?.code == 11000)
          throw {
            status: 400,
            message: 'username, email or mobile number already exist.',
          };
      });
      return res.json(newUser);
    } catch (error) {
      next(error);
    }
  }

  login() {}

  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
