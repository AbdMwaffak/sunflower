const mongoose = require('mongoose');

const perfumeOrderVariant = new mongoose.Schema({
  size: String,
  count: Number,
});

const perfumeOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  perfumeOrderVariants: [perfumeOrderVariant],

  message: {
    type: String,
    default: '',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  activeSC: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const perfumeOrder = mongoose.model('PerfumeOrder', perfumeOrderSchema);

module.exports = perfumeOrder;
