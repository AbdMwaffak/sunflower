const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  color : {
    type : String,
    required : true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;
