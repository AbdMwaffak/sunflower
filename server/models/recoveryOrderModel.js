const mongoose = require('mongoose');

const recoveryOrderSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: ['recovery', 'replace'],
  },
  message: {
    type: String,
    default: '',
  },

  file: String,

  order: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'docModel',
  },
  docModel: {
    type: String,
    enum: ['PerfumeOrder', 'Order'],
  },
});

const RecoveryOrder = mongoose.model('RecoveryOrder', recoveryOrderSchema);

module.exports = RecoveryOrder;
