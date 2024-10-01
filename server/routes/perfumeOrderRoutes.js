const router = require('express').Router();
const perfumeOrderController = require('./../controllers/perfumeOrderController');
const { protect } = require('./../controllers/authController');

router.post('/', protect, perfumeOrderController.add);

router.patch(
  '/updateVariants/:id',
  protect,
  perfumeOrderController.updateOrderVariants
);

router.delete(
  '/:id',
  protect,
  perfumeOrderController.deletePerfumeOrder
)
module.exports = router;
