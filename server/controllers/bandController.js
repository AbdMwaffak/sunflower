const catchAsync = require('../utils/catchAsync');
const Band = require('./../models/bandModel');
const Features = require('./../utils/features');
const AppError = require('./../utils/appError');

exports.add = catchAsync(async (req, res, next) => {
  const c = await Band.countDocuments({});
  await Band.create({ name : `band ${c + 1}`, color :req.body.color });
  res.status(201).send('Band Created Successfully!');
});

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new Features(Band.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const bands = await features.query.sort({ createAt: -1 });
  if (bands.length === 0)
    return res.send('There is no bands yet😊');

  res.status(200).send(bands);
});

exports.deleteBand = catchAsync(async (req,res,next)=>{
  const {id} = req.params;
 
    await Band.findByIdAndDelete(id)
    return res.status(200).send('Band deleted successfully!');
 
})

// exports.update = catchAsync(async (req,res,next)=>{
//   const id = req.params.id;
//   const updatedBand = await Band.findByIdAndUpdate(
//     id,
//     {
//       name: req.body.name,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//     if(!updatedBand) return next(new AppError('Invalid ID' , 500));

//   return res.status(200).send(updatedBand);
// })