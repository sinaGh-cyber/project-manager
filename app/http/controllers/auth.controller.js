const { UserModel } = require('../../models/user');
const { hashString, tokenGenerator } = require('../../modules/functions');
const bcrypt = require('bcrypt');

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

  async login(req, res, next) {
    try {
      console.log(req.headers);
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user)
        throw { status: 400, message: 'username or password is incorrect.' };

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect)
        throw { status: 400, message: 'username or password is incorrect.' };

      const token = tokenGenerator({ username });
      user.token = token;
      user.save();
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'you are logged in successfully',
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
