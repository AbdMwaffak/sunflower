const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  nameAr: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

categorySchema.pre('save', async function (next) {
  this.name = this.name.toLowerCase();
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
