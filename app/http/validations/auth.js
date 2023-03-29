const { body } = require('express-validator');
const { UserModel } = require('../../models/user');

function registerValidator() {
  return [
    body('username')
      .isLength({ min: 4, max: 25 })
      .custom(async (value, ctx) => {
        if (value) {
          const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
          if (usernameRegex.test(value)) {
            const user = await UserModel.findOne({ username: value });
            if (user) throw 'user with this username already exist.';
            return true;
          }
          throw 'invalid username';
        }
        throw 'username is Required';
      }),
    body('email')
      .isEmail()
      .withMessage('email is invalid.')
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) throw 'user with this email already exist.';
        return true;
      }),
    body('mobile')
      .isMobilePhone('fa-IR')
      .withMessage('phone number is invalid.'). custom(async (mobile) => {
        const user = await UserModel.findOne({ mobile });
        if (user) throw 'user with this mobile number already exist.';
        return true;
      }),
    body('password')
      .isLength({ min: 6, max: 16 })
      .withMessage('password length should be ')
      .custom((value, ctx) => {
        if (!value) throw 'password is required';
        if (value !== ctx?.req?.body?.confirm_password)
          throw 'password should be equal to confirm-password.';
        return true;
      }),
  ];
}

module.exports = {
  registerValidator,
};
