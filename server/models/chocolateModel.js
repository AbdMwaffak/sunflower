const mongoose = require('mongoose');

const chocolateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameAr: {
    type: String,
    // required: true,
  },
  image: String,
  size: String,
  createAt: {
    type: Date,
    default: new Date(),
  },
  price: {
    type: Number,
    required: true,
  },
});

const Chocolate = mongoose.model('Chocolate', chocolateSchema);

module.exports = Chocolate;
