const Paper = require('./../models/paperModel');
const catchAsync = require('./../utils/catchAsync');
const Features = require('./../utils/features');
const AppError = require('./../utils/appError');

exports.add = catchAsync(async (req, res, next) => {
  await Paper.create({ ...req.body});

  res.status(201).send('Paper Added Successfully!');
});


exports.getAll = catchAsync(async (req,res,next)=>{
  const features = new Features(Paper.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const papers = await features.query.sort({ createAt: -1 });
  if (papers.length === 0)
    return res.send('There is no bands yet😊');

  res.status(200).send(papers);
})

exports.deletePaper = catchAsync(async (req,res,next)=>{
  const {id} = req.params;
  
    await Paper.findByIdAndDelete(id)
    return res.status(200).send('Paper deleted successfully!');  
})



// exports.update = catchAsync(async (req,res,next)=>{
//   const id = req.params.id;
//   const updatedBox = await Box.findByIdAndUpdate(
//     id,
//     {
//       name: req.body.name,
//       image: req.file?.filename,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//     if(!updatedBox) return next(new AppError('Invalid ID' , 500));

//   return res.status(200).send(updatedBox);
// })