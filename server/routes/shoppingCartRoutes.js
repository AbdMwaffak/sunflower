const router = require('express').Router();
const shoppingCartController = require('./../controllers/shoppingCartController');
const {protect } = require('./../controllers/authController');

router.post
(
    '/',
    protect,
    shoppingCartController.add
)

router.get
(
    '/',
    protect,
    shoppingCartController.get
)

router.post
(
    '/delete/:id',
    protect,
    shoppingCartController.deleteFromSC
)

router.patch
(
    '/emptyTheBasket',
    protect,
    shoppingCartController.emptyTheBasket
)

router.post
(
    '/offers',
    protect,
    shoppingCartController.addOfferToShoppingCart
)

router.delete
(
    '/offers/:id',
    protect,
    shoppingCartController.deleteOfferFromShoppingCart
)
module.exports = router;