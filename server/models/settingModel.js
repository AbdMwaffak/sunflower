const mongoose = require('mongoose');

const sliderImageSchema = new mongoose.Schema({
  image: String,
});

const settingSchema = new mongoose.Schema({
  slider: [sliderImageSchema],
  facebook: String,
  tiktok: String,
  instagram: String,
  phone: String,
  whatsapp: String,
  email: String,
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
