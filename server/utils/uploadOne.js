const multer = require('multer');

exports.addFile = () => {};
const storage = multer.diskStorage({
  // Set the path to store the images in it
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, './public/users');
    if (file.mimetype.startsWith('video')) cb(null, './public/videos');
  },
  // set name of the image
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user_${Date.now()}_${file.originalname.split('.')[0]}.${ext}`);
  },
});

// const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    // cb(new AppError('Not an image! please upload only images', 400), false);
    throw new Error('Not an image! please upload only images');
  }
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
});

exports.uploadOne = upload.single('image');
