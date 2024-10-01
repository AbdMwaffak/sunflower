const router = require('express').Router();
const { checkLogedUser } = require('../controllers/authController');
const productController = require('./../controllers/productController');
const upload = require('./../utils/uploadMultiple');

router.post
    (
        '/',
        upload.uploadMultiple,
        productController.add
    );

router.get
    (
        '/',
        checkLogedUser,
        productController.getAll
    )

    router.get
        (
            '/search',
            productController.searchProducts
        )

router.get(
        '/suggested/:id',
        productController.getSuggestedProducts
);
router.get
    (
        '/:id',
        productController.getById
    )

router.patch
    (
        '/:id',
        upload.uploadMultiple,
        productController.update
    )


module.exports = router;
