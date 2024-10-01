const router = require('express').Router();
const articleController = require('./../controllers/articleController');
const upload = require('./../utils/uploadOne');
const authController = require('./../controllers/authController');
const validate = require('./../middlewares/validate');

const {
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
  likeArticleSchema,
} = require('./../validations/articleValidation');

router.post(
  '/',
  // authController.protect,
  // authController.restrictTo('admin'),
  validate(createArticleSchema),
  upload.uploadOne,
  articleController.create
);

router.patch(
  '/delete/:id',
  authController.protect,
  authController.restrictTo('admin'),
  validate(deleteArticleSchema),
  articleController.deleteArticle
);

router.patch(
  '/like/:id',
  authController.protect,
  validate(likeArticleSchema),
  articleController.like
);

router.patch(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  validate(updateArticleSchema),
  upload.uploadOne,
  articleController.update
);

router.get('/:id', articleController.getById);

router.get('/', authController.checkLogedUser, articleController.getAll);

module.exports = router;
