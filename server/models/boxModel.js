const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  image: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Box = mongoose.model('Box', boxSchema);

module.exports = Box;
