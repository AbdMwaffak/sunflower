const mongoose = require('mongoose');

const sliderImageSchema = new mongoose.Schema({
  image : String
})

const settingSchema = new mongoose.Schema({
  slider : [sliderImageSchema],
  facebook : String,
  tiktok : String,
  instagram : String,
  phone : String,
});

const Setting = mongoose.model('Setting',settingSchema);
module.exports = Setting;