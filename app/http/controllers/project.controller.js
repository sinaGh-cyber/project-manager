const { ProjectModel } = require('../../models/project');

class ProjectController {
  async createProject(req, res, next) {
    try {
      const owner = req.user._id;
      const { title, text, image } = req.body;
      const result = await ProjectModel.create({ title, text, owner, image });

      if (!result) throw { status: 400, message: 'can not add new task.' };
      return res
        .status(201)
        .json({
          status: 201,
          success: true,
          message: 'task created successfully.',
        });
    } catch (error) {
      next(error);
    }
  }

  getAllProjects() {}

  grtProjectById() {}

  getAllProjectOfTeam() {}

  getProjectsOfUser() {}

  updateProject() {}

  removeProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
