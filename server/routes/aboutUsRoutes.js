const router = require('express').Router();
const {add, getAll, getById, update, deleteParagraph} = require('./../controllers/aboutUsController');
const {protect , restrictTo} = require('./../controllers/authController');

router.post
(
  '/',
  protect,
  restrictTo('admin'),
  add
);

router.get
(
  '/',
  getAll
);

router.get
(
  '/:id',
  getById
);

router.patch
(
  '/:id',
  protect,
  restrictTo('admin'),
  update
);

router.delete
(
  '/:id',
  protect,
  restrictTo('admin'),
  deleteParagraph
);

module.exports = router;