const router = require('express').Router();
const naturalFlowerController = require('./../controllers/naturalFlowerController');
const {protect , restrictTo} = require('./../controllers/authController');
const upload = require('./../utils/uploadOne');

router.post
    (
        '/',
        protect,
        restrictTo('admin'),
        upload.uploadOne,
        naturalFlowerController.add
    );

router.get
    (
        '/',
        naturalFlowerController.getAll
    );

router.get
    (
        '/:id',
        naturalFlowerController.getById
    )

router.patch
    (
        '/:id',
        protect,
        restrictTo('admin'),
        upload.uploadOne,
        naturalFlowerController.update
    )

router.patch
    (
        '/delete/:id',
        protect,
        restrictTo('admin'),
        naturalFlowerController.deleteNaturalFlower
    )

module.exports = router;