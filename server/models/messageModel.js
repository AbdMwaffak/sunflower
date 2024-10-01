const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  userDetails:{
    name : String,
    image : String
  },
  message : {
    type : String,
    required : true
  },
  reply : {
    type : String,
    default : ''
  },
  isReplied:{
    type : Boolean,
    dafault : false
  }
},{
  timestamps : true
})

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;