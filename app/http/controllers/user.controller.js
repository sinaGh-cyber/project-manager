const { UserModel } = require('../../models/user');

class UserController {
  getProfile(req, res, next) {
    try {
      const user = {...req.user};

      user.Profile_image = req.protocol + '://' + req.get('host') + '/' + (req.user.Profile_image).replace(/[\\\\]/gm, '/');

      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async editProfile(req, res, next) {
    try {
      const data = { ...req.body };
      const userID = req.user._id;
      const fields = ['first_name', 'last_name', 'skills'];
      const badValues = ['', null, undefined, 0, -1, NaN, [], {}];

      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key) || badValues.includes(value))
          delete data[key];
        if (key === 'skills' && value.length) {
          data[key] = value.filter((skill) => !!skill.trim());
        }
      });

      console.log(data);
      const result = await UserModel.updateOne({ _id: userID }, { $set: data });

      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'your profile data updated successfully.',
        });
      }
      throw { status: 400, message: 'user profile can not be updated' };
    } catch (error) {
      next(error);
    }
  }
async uploadProfileImage(req, res, next){
  try {
    const userID = req.user._id;
    const filePath = req.file?.path?.substring(7);;
    const result = await UserModel.updateOne({_id: userID}, { $set : {Profile_image: filePath}});

    if (result.modifiedCount == 0) throw {status: 400, success: false, message: 'can not update profile image.'};

    res.status(200).json({
      status: 200,
      success: true,
      message: "profile image updated successfully."
    })
  } catch (error) {
    next(error)
  }
}

  addSkills() {}

  editSkills() {}

  acceptInvitationToTeam() {}

  rejectInvitationToTeam() {}
}

module.exports = {
  UserController: new UserController(),
};
