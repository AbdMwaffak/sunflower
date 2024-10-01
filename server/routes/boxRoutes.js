const router = require('express').Router();
const upload = require('./../utils/uploadOne');
const boxController = require('./../controllers/boxController');
const authController = require('./../controllers/authController');

router.post
    (
        '/',
        authController.protect,
        authController.restrictTo('admin'),
        upload.uploadOne,
        boxController.add
    );

router.get
    (
        '/',
        boxController.getAll
    );

router.patch
    (
        '/:id',
        authController.protect,
        authController.restrictTo('admin'),
        upload.uploadOne,
        boxController.update
    );

module.exports = router;
