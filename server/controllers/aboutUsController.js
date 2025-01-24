const AboutUs = require('./../models/aboutUsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.add = catchAsync(async (req, res, next) => {
  const { title, description, titleAr, descriptionAr } = req.body;
  if (!title || !description || !titleAr || !descriptionAr)
    return next(new AppError('Please provide title & description 👊', 400));

  await AboutUs.create({ title, description, titleAr, descriptionAr });
  res.status(201).send('Done!');
});

exports.getById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const paragraph = await AboutUs.findById(id);
  if (!paragraph) return next(new AppError('not found!', 404));

  return res.status(200).send(paragraph);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const paragraphs = await AboutUs.find();
  res.status(200).send(paragraphs);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedParagraph = await AboutUs.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      titleAr: req.body.titleAr,
      descriptionAr: req.body.descriptionAr,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send('Updated Successfully');
});

exports.deleteParagraph = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const paragraph = await AboutUs.findByIdAndDelete(id);

  if (!paragraph) return next(new AppError('something went wrong!', 404));

  return res.status(200).send('Done!');
});
