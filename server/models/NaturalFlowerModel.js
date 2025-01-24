const mongoose = require('mongoose');

const naturalFlowerSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  descriptionAr: {
    type: String,
  },

  image: String,
});

const NaturalFlower = mongoose.model('NaturalFlower', naturalFlowerSchema);

module.exports = NaturalFlower;
