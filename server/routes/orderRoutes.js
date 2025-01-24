const router = require('express').Router();
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

router.post('/', authController.protect, orderController.addOrder);
router.get(
  '/',
  authController.protect,
  // authController.restrictTo('admin'),
  orderController.getAll
);
router.get('/:id', authController.protect, orderController.getById);
router.patch(
  '/changeState/:id',
  authController.protect,
  authController.restrictTo('admin'),
  orderController.changeOrderState
);
module.exports = router;
