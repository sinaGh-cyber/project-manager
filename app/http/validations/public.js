const { param } = require("express-validator");

function mongoIdValidator(){
    return [
        param('id').isMongoId().withMessage('param ID is invalid.')
    ]
}

module.exports = {
    mongoIdValidator
}