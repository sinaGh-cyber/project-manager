const { body } = require("express-validator");

function createProjectValidator(){
    return [
        body("title").notEmpty().withMessage('project title is required.'),
        body("text").notEmpty().isLength({min : 20}).withMessage("project description can not be less than 20 characters!"),
    ]
}
module.exports = {
    createProjectValidator
}