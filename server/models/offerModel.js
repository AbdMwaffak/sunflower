const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  descriptionAr: {
    type: String,
    required: true,
  },
  nameAr: {
    type: String,
    required: true,
  },
});

const offerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nameAr: {
    type: String,
    // required: true,
  },
  descriptionAr: {
    type: String,
    // required: true,
  },
  products: {
    type: [productSchema],
    default: [],
  },
  priceB: {
    type: Number,
  },
  priceA: {
    type: Number,
    required: true,
  },
  withPriceB: {
    type: Boolean,
    default: false,
  },
  mainImage: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
