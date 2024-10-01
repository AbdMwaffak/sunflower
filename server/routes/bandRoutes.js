const router = require('express').Router();
const bandController = require('./../controllers/bandController');
const authController = require('./../controllers/authController');
const upload = require('./../utils/uploadOne');

router.post
    (
        '/',
        authController.protect,
        authController.restrictTo('admin'),
        upload.uploadOne, bandController.add
    );

router.get
    (   
        '/',
        bandController.getAll
    );

router.delete
    (   
        '/:id',
        bandController.deleteBand
    );
    
module.exports = router;
