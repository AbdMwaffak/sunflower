const router = require('express').Router();
const {get , update, addImgToSlider, removeImgFromSlider} = require('./../controllers/settingController');
const {protect , restrictTo} = require('./../controllers/authController');
const { uploadFile } = require('./../utils/upload');

router.get(
  '/',
  get
);

router.patch(
  '/',
  protect,
  restrictTo('admin'),
  update
);

router.post(
  '/',
  protect,
  restrictTo('admin'),
  uploadFile('slider' , 'slider' , 'image').array('images'),
  addImgToSlider
);

router.delete
(
  '/:id',
  protect,
  restrictTo('admin'),
  removeImgFromSlider
)

module.exports = router;