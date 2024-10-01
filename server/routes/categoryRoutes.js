const router = require('express').Router();
const {
  add,
  getAll,
  getById,
  update,
  changeState,
  deleteCategory,
} = require('./../controllers/categoryController');

const { protect, restrictTo } = require('./../controllers/authController');
const upload = require('./../utils/uploadOne');
const {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} = require('./../validations/categoryValidation');
const validate = require('./../middlewares/validate');

router.post(
  '/',
  protect,
  restrictTo('admin'),
  upload.uploadOne,
  validate(createCategorySchema),
  add
);

router.get('/:id', getById);

router.patch('/changeState/:id', protect, restrictTo('admin'), changeState);

router.patch(
  '/delete/:id',
  protect,
  restrictTo('admin'),
  validate(deleteCategorySchema),
  deleteCategory
);

router.patch(
  '/:id',
  protect,
  restrictTo('admin'),
  upload.uploadOne,
  validate(updateCategorySchema),
  update
);

router.get('/', getAll);

module.exports = router;
