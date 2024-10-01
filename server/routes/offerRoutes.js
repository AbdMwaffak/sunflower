const router = require('express').Router();
const {protect , restrictTo} = require('./../controllers/authController');
const {add , getAll,getById,update,deleteOffer, addProductToOffer, updateOfferProducts, removeProductFromOffer, changeState} = require('./../controllers/offerController');
const { uploadFile } = require('./../utils/upload');

router.post
(
    '/',
    protect,
    restrictTo('admin'),
    uploadFile('offers' , 'offer' , 'image').single('mainImage'),
    add
);

router.post
(
    '/:id',
    protect,
    restrictTo('admin'),
    uploadFile('offers' , 'offer' , 'image').single('image'),
    addProductToOffer
);

router.patch
(
    '/:id',
    protect,
    restrictTo('admin'),
    uploadFile('offers' , 'offer' , 'image').single('mainImage'),
    update
  );

router.patch
(
  '/:offerId/products/:productId',
  uploadFile('offers' , 'offer' , 'image').single('image'),
  updateOfferProducts
)

router.delete
(
  '/:offerId/products/:productId',
  removeProductFromOffer
)

router.patch
(
  '/changeState/:id',
  changeState
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

router.delete
(
    '/:id',
    protect,
    restrictTo('admin'),
    deleteOffer
);

module.exports = router;