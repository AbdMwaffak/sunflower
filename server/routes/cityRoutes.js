const router = require('express').Router();
const {protect , restrictTo} = require('./../controllers/authController');
const {add,getAll,getById,update,deleteCity} = require('./../controllers/cityController');

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
    deleteCity
);

module.exports = router;