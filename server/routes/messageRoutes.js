const router = require('express').Router();
const {getAll,getById,getMyMessages,replyToMessage,sendMessage, deleteMessage} = require('./../controllers/messageController');
const {protect , restrictTo} = require('./../controllers/authController');

router.post('/' , protect , sendMessage);
router.post('/reply/:id' , protect , restrictTo('admin') , replyToMessage);
router.get('/'  ,getAll);
router.get('/me' , protect , getMyMessages);
router.get('/:id' , getById);
router.delete('/:id',protect,deleteMessage)

module.exports = router;