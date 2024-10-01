const router = require('express').Router();
const chocolateController = require('./../controllers/chocolateController');
const {protect , restrictTo} = require('./../controllers/authController');
const upload = require('./../utils/uploadOne');

router.post
    (
        '/',
        protect,
        restrictTo('admin'),
        upload.uploadOne,
        chocolateController.add
    );

router.get
    (
        '/',
        chocolateController.getAll
    );

router.patch
    (
        '/:id',
        protect,
        restrictTo('admin'),
        upload.uploadOne,
        chocolateController.update
    );

router.delete
    (
        '/:id',
        protect,
        restrictTo('admin'),
        chocolateController.deleteChocolate
    );

module.exports = router;
