const AppError = require('../utils/appError');
const City = require('./../models/cityModel');
const catchAsync = require('./../utils/catchAsync');

exports.add = catchAsync(async (req, res, next) => {
  const { name, nameAr } = req.body;
  const neighborhoods = JSON.parse(req.body.neighborhoods);
  const city = await City.create({ name, nameAr, neighborhoods });

  res.status(201).send('Done!');
});

exports.getAll = catchAsync(async (req, res, next) => {
  const cities = await City.find();
  res.status(200).send(cities);
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const city = await City.findById(id);
  if (!city) return next(new AppError('City Not Found', 404));

  res.status(200).send(city);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const city = await City.findById(id);
  let { neighborhoods } = city;
  neighborhoods = JSON.parse(req.body.neighborhoods || null) ?? neighborhoods;
  const updatedCity = await City.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      nameAr: req.body.nameAr,
      neighborhoods,
      isActive: req.body.isActive,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send('Updated Successfully!');
});

exports.deleteCity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await City.findByIdAndDelete(id);
  res.status(200).send('City has Removed Successfully!');
});
