const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameAr: {
    type: String,
    // required: true,
  },
  neighborhoods: {
    type: [String],
    default: [],
  },
  neighborhoodsAr: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  numOrders: {
    type: Number,
    default: 0,
  },
});

const City = mongoose.model('City', citySchema);
module.exports = City;

/*
    <input type="text" list="cars" />
    <datalist id="cars">
        <option>Volvo</option>
        <option>Saab</option>
        <option>Mercedes</option>
        <option>Audi</option>
    </datalist>
*/
