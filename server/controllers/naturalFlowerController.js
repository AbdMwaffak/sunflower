const NaturalFlower = require('./../models/NaturalFlowerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Features = require('./../utils/features');

exports.add = catchAsync(async (req,res,next)=>{
    const image = req.file.filename;
    await NaturalFlower.create({...req.body , image});

    res.status(201).send('New Natural Flower Added Sucessfully!');
});

exports.getAll = catchAsync(async (req,res,next)=>{
    const features = new Features(NaturalFlower.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const naturalFlowers = await features.query.sort({ createAt: -1 });

  res.status(200).send(naturalFlowers);
})

exports.getById = catchAsync(async (req,res,next)=>{
  const {id} = req.params;
  const naturalFlower = await NaturalFlower.findById(id);
  if(!naturalFlower) return next(new AppError('This flower does not exist 🤦‍♂️' , 404));

  res.status(200).send(naturalFlower);
})

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedNaturalFLower = await NaturalFlower.findByIdAndUpdate(
    id,
    {
      count: req.body.count,
      price: req.body.price,
      description: req.body.description,
      image: req.file?.filename,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send(updatedNaturalFLower);
});

exports.deleteNaturalFlower = catchAsync(async (req,res,next)=>{
  const {id} = req.params;
  if(req.body.pass === process.env.PASS_DELETE)
  {
    await NaturalFlower.findByIdAndDelete(id)
    return res.status(200).send('NaturalFlower deleted successfully!');
  }
  return next(new AppError('This process has registered' , 400));
})