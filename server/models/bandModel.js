const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

const Band = mongoose.model('Band', bandSchema);

module.exports = Band;
