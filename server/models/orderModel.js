const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  basketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShoppingCart',
    // required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  neighborhood: String,
  addressDetails: String,
  paymentMethod: String, // apple pay , google pay , master card , mada pay
  orderStatus: {
    type: String,
    default: 'processing', // processing , delivered
  },
  phone: {
    type: String,
    required: true,
  },
  notes: String,
  cart: Object,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
