const router = require('express').Router();
const { checkLogedUser } = require('../controllers/authController');
const productController = require('./../controllers/productController');
const upload = require('./../utils/uploadMultiple');
const authController = require('./../controllers/authController');

router.post(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  upload.uploadMultiple,
  productController.add
);

router.get('/', checkLogedUser, productController.getAll);

router.get('/search', productController.searchProducts);

router.get('/suggested/:id', productController.getSuggestedProducts);
router.get('/:id', productController.getById);

router.patch(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  upload.uploadMultiple,
  productController.update
);

router.delete(
  '/:id',
  authController.protect,
  authController.restrictTo('admin'),
  productController.deleteProduct
);

module.exports = router;
