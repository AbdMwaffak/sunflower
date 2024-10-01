const multer = require('multer');
const AppError = require('./appError');

function uploadFile(dest, name, filetype) {
  const storage = multer.diskStorage({
    // Set the path to store the images in it
    destination: (req, file, cb) => {
      cb(null, `./public/${dest}`);
    },
    // set name of the image
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(
        null,
        `${name}_${Date.now()}_${file.originalname.split('.')[0]}.${ext}`
      );
    },
  });
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith(filetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! please upload only images', 400), false);
    }
  };
  const upload = multer({
    storage,
    fileFilter: multerFilter,
  });

  return upload;
}


exports.uploadFile = uploadFile;
