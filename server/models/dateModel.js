const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  day : {
    type : Number,
    required : true,
    min : 1,
    max : 31
  },
  month : {
    type : Number,
    required : true,
    min : 1,
    max : 12
  },
  year : {
    type : Number,
    required : true
  }
})

const DateModel = mongoose.model('Date' , dateSchema);
module.exports = DateModel;