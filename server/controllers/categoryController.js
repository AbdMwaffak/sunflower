const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');
const Features = require('./../utils/features');
const AppError = require('./../utils/appError');  

exports.add = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const image = req.file?.filename;

  if(!name || !image){
    return next(new AppError('Bad Request : you must send name and image 🌹' , 400))
  }
  await Category.create({ name, image });

  res.status(201).send('Category Added Successfully!');
});

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new Features(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const categories = await features.query.sort({ createdAt: -1 });

  res.status(200).json(categories);
})

exports.getById = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;
  const category = await Category.findById(id);
  res.status(200).send(category);
})

exports.update = catchAsync (async (req, res, next) => {
  const id = req.params.id;
  const updatedCategory = await Category.findByIdAndUpdate(
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

  res.send(updatedCategory);
});

exports.changeState = catchAsync(async (req,res,next)=>{
  const {id} = req.params;
  const category = await Category.findById(id);

  const updatedCategory = await Category.findByIdAndUpdate(id , {
    isActive : !category.isActive 
  },{
    runValidators : true,
    new : true
  }
  )

  return res.status(200).send(updatedCategory)
})

exports.deleteCategory = catchAsync(async (req,res,next)=>{
  const {id} = req.params;
  if(req.body.pass === process.env.PASS_DELETE)
  {
    await Category.findByIdAndDelete(id)
    return res.status(200).send('Category deleted successfully!');
  }
  return next(new AppError('This process has registered' , 400));
})