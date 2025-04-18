const mongoose = require('mongoose');

const sizes = new mongoose.Schema({
  size: String,
  price: Number,
  priceInPoints: {
    type: Number,
    default: 0,
  },
  isAvailableToSellInPoints: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nameAr: {
    type: String,
    // required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },

  images: [String],

  description: {
    type: String,
    required: true,
    trim: true,
  },
  descriptionAr: {
    type: String,
    // required: true,
    trim: true,
  },
  sizes: [sizes],

  colors: [String],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  categoryName: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  priceInPoints: {
    type: Number,
    default: 0,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
  isAvailableToSellInPoints: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
