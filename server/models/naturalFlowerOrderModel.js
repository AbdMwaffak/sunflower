const mongoose = require('mongoose');

const Chocolate = new mongoose.Schema({
  kind: String,
  size: String,
  count: Number,
  image : String
});

const naturalFlowerOrderSchema = new mongoose.Schema({
  naturalFlower : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'NaturalFlower',
    required : true
  },

  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    select : false
  },
  chocolates: [Chocolate],

  details : {
    band :String,
    paper :String
  },
  totalPrice : {
    type : Number,
    required : true
  },
  activeSC :{
    type : Boolean,
    default : true,
    select : false
  },
  message: {
    type: String,
    default: '',
  },
  active : {
    type : Boolean,
    dafault : true
  }
});

const NaturalFlowerOrder = mongoose.model('Naturalflowerorder', naturalFlowerOrderSchema);

module.exports = NaturalFlowerOrder;