const Box = require('./../models/boxModel');
const catchAsync = require('./../utils/catchAsync');
const Features = require('./../utils/features');
const AppError = require('./../utils/appError');

exports.add = catchAsync(async (req, res, next) => {
  await Box.create({ ...req.body, image: req.file?.filename });

  res.status(201).send('Box Added Successfully!');
});


exports.getAll = catchAsync(async (req,res,next)=>{
  const features = new Features(Box.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const boxes = await features.query.sort({ createAt: -1 });
  if (boxes.length === 0)
    return res.send('There is no bands yet😊');

  res.status(200).send(boxes);
})

exports.update = catchAsync(async (req,res,next)=>{
  const id = req.params.id;
  const updatedBox = await Box.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      image: req.file?.filename,
    },
    {
      new: true,
      runValidators: true,
    }
  );
    if(!updatedBox) return next(new AppError('Invalid ID' , 500));

  return res.status(200).send(updatedBox);
})