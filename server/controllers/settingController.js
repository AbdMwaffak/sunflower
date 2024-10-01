const Setting = require('./../models/settingModel');
const catchAsync = require('./../utils/catchAsync');

exports.get = catchAsync(async(req,res,next)=>{
  const settings = await Setting.findOne();
  if (!settings) {
    const newSettings = new Setting({
      phone : '',
      facebook: '',
      tiktok: '',
      instagram: '',
      slider: [],
    });
    await newSettings.save();
    return res.status(200).send(newSettings);
  }
  return res.status(200).send(settings);
});

exports.update = catchAsync(async(req,res,next)=>{
  
  const settings = await Setting.findOneAndUpdate({}, req.body, { new: true , runValidators : true });
  if (!settings) {
    return res.status(404).json({ message: 'Settings not found' });
  }
  return res.status(200).send(settings);
});

exports.addImgToSlider = catchAsync(async (req,res,next)=>{
  const setting = await Setting.findOne();
  req.files.forEach(img => {
    const image = `${process.env.HOST}/slider/${img.filename}`;
    setting.slider = [...setting.slider , {image}]
  });

  await setting.save();
  res.send(setting);
});

exports.removeImgFromSlider = catchAsync(async(req,res,next)=>{
  const id = req.params.id;
  const setting = await Setting.findOneAndUpdate({},
    { $pull: { slider : { _id: id } } },{new : true}
  );
  res.status(200).send(setting);
})