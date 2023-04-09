const { body } = require('express-validator');

function createProjectValidator() {
  return [
    body('title').notEmpty().withMessage('project title is required.'),
    body('tags')
      .isArray({ min: 0, max: 10 })
      .withMessage('you can only add less than 10 tags.')
      .custom((tags, ctx) => {
        let isValid = true;
        tags.forEach((tag) => {
          if (['', ' ', 0, null, undefined, NaN].includes(tag)) {
            isValid = false;
            return;
          }
          console.log(tag, ['', ' ', 0, null, undefined, NaN].includes(tag));
        });
        return isValid;
      }),
    body('text')
      .isLength({ min: 20 })
      .withMessage('project description can not be less than 20 characters!'),
  ];
}
module.exports = {
  createProjectValidator,
};
