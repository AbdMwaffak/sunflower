const router = require('express').Router();
const upload = require('./../utils/uploadOne');
const paperController = require('./../controllers/paperController');
const authController = require('./../controllers/authController');

router.post
    (
        '/',
        authController.protect,
        authController.restrictTo('admin'),
        paperController.add
    );

router.get
    (
        '/',
        paperController.getAll
    );
    
router.delete
    (
        '/:id',
        paperController.deletePaper
    );


module.exports = router;
