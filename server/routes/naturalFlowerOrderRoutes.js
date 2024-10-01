const router = require('express').Router();
const naturalFlowerOrderController = require('../controllers/naturalFlowerOrderController');
const {protect} = require('./../controllers/authController');

router.post
    (
        '/',
        protect,
        naturalFlowerOrderController.add
    );

router.delete
    (
        '/:id',
        protect,
        naturalFlowerOrderController.deleteNFOrder
    )
module.exports = router;
