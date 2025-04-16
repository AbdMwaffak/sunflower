const router = require('express').Router();
const {
  login,
  signUp,
  protect,
  checkOTP,
} = require('./../controllers/authController');
const {
  addToFavorite,
  removeFromFavorite,
  getFavorite,
  emptyFavorite,
  me,
  addRemoveFromFavorite,
} = require('./../controllers/userController');
const upload = require('../utils/uploadOne');

router.post('/signup', upload.uploadOne, signUp);
router.post('/login', login);
router.post('/verify', checkOTP);
router.patch('/addToFavorite', protect, addToFavorite);
router.patch('/removeFromFavorite', protect, removeFromFavorite);
router.patch('/handleFavorite', protect, addRemoveFromFavorite);
router.get('/getFavorite', protect, getFavorite);
router.get('/me', protect, me);
router.patch('/emptyFavorite', protect, emptyFavorite);

module.exports = router;
