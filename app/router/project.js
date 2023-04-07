const fileUpload = require('express-fileupload');
const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkError');
const { createProjectValidator } = require('../http/validations/project');
const { uploadFile } = require('../modules/express-fileupload');
const { mongoIdValidator } = require('../http/validations/public');

const router = require('express').Router();

router.post(
  '/create',
  fileUpload(),
  checkLogin,
  uploadFile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
);
router.get('/list', checkLogin, ProjectController.getAllProjects);
router.get(
  '/:id',
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.getProjectById
);
router.delete(
  '/remove/:id',
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.removeProject
);
router.post(
  '/edit/:id',
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.updateProject
);

module.exports = {
  projectRoutes: router,
};
