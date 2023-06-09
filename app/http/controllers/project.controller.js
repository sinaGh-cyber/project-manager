const autoBind = require('auto-bind');
const { ProjectModel } = require('../../models/project');
const { createLinkForFile } = require('../../modules/functions');

class ProjectController {
  constructor() {
    autoBind(this);
  }
  async createProject(req, res, next) {
    try {
      const owner = req.user._id;
      const { title, text, image, tags } = req.body;
      const result = await ProjectModel.create({
        title,
        text,
        owner,
        image,
        tags,
      });

      if (!result) throw { status: 400, message: 'can not add new task.' };
      return res.status(201).json({
        status: 201,
        success: true,
        message: 'task created successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await ProjectModel.find({ owner });

      for (const project of projects) {
        project.image = createLinkForFile(project.image, req)
      }

      return res.status(201).json({
        status: 201,
        success: true,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }

  async #foundProject(projectID, owner) {
    const project = await ProjectModel.findOne({ owner, _id: projectID });
    if (!project)
      throw { status: 400, success: false, message: 'can not find project.' };

    return project;
  }

  async getProjectById(req, res, next) {
    try {
      const projectID = req.params.id;
      const owner = req.user._id;

      const project = await this.#foundProject(projectID, owner);

      project.image = createLinkForFile(project.image, req)
      return res.status(200).json({
        status: 200,
        success: true,
        project,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeProject(req, res, next) {
    try {
      const projectID = req.params.id;
      const owner = req.user._id;
      const project = await this.#foundProject(projectID, owner);

      const deleteProjectResult = await ProjectModel.deleteOne({
        _id: projectID,
      });
      if (deleteProjectResult.deletedCount == 0)
        throw { status: 400, message: 'can not delete this project.' };

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'project deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProjectImage(req, res, next) {
    const image = req.body.image;
    const owner = req.user._id;
    const projectId = req.params.id;

    await this.#foundProject(projectId, owner);

    const updateResult = await ProjectModel.updateOne(
      { _id: projectId },
      { $set: { image } }
    );

    if (updateResult.modifiedCount == 0)
      throw {
        status: 400,
        success: false,
        message: 'can not modify project.',
      };

    res.status(200).json({
      status: 200,
      success: true,
      message: 'project modified successfully.',
    });
    try {
    } catch (error) {
      next(error);
    }
  }

  async getAllProjectOfTeam(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getProjectsOfUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const projectId = req.params.id;
      const owner = req.user._id;

      const project = await this.#foundProject(projectId, owner);

      const newData = { ...req.body };
      Object.entries(newData).forEach(([key, value]) => {
        if (!['title', 'text', 'tags'].includes(key)) delete newData[key];
        if (['', ' ', 0, null, undefined, NaN].includes(value))
          delete newData[key];
      });

      const updateResult = await ProjectModel.updateOne(
        { _id: projectId, owner },
        { $set: newData }
      );

      if (updateResult.modifiedCount == 0)
        throw {
          status: 400,
          success: false,
          message: 'can not modify project.',
        };

      res.status(200).json({
        status: 200,
        success: true,
        message: 'project modified successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProjectController: new ProjectController(),
};
