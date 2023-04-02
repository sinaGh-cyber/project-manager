const { body } = require('express-validator');
const path = require('path');

function imageValidator() {
  return [
    body('image').custom((image, { req }) => {
      if (Object.keys(req?.file)?.length == 0) throw 'please select an image.';

      const ext = path.extname(req.file.originalname);
      const validExts = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
      if (!validExts.includes(ext))
        throw `this type of file doesn't valid, please send a file with following extnames: ${validExts.join(
          ', '
        )} `;

      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) throw 'image size should be less than 2MBs.';
      return true;
    }),
  ];
}

module.exports = {
  imageValidator,
};
