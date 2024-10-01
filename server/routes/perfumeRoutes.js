const router = require('express').Router();
const perfumeController = require('./../controllers/perfumeController');
const upload = require('./../utils/uploadMultiple');
const { protect, restrictTo } = require('./../controllers/authController');

router.post('/', upload.uploadMultiple, perfumeController.add);

router.patch(
  '/',
  protect,
  restrictTo('admin'),
  upload.uploadMultiple,
  perfumeController.update
);
router.patch(
  '/updateVariants/:id',
  protect,
  restrictTo('admin'),
  perfumeController.updateVariants
);

router.get('/', perfumeController.get);

router.post(
  '/addNewSize/:id',
  protect,
  restrictTo('admin'),
  perfumeController.addNewSize
);

module.exports = router;
