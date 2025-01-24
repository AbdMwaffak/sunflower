const Chocolate = require('./../models/chocolateModel');
const Features = require('./../utils/features');
const catchAsync = require('./../utils/catchAsync');

exports.add = catchAsync(async (req, res, next) => {
  const { name, size, price, nameAr } = req.body;

  const image = req.file.filename;

  await Chocolate.create({ name, price, size, image, nameAr });
  res.send('New Chocolate Added Successfully!');
});

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new Features(Chocolate.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const chocolates = await features.query.sort({ createAt: -1 });
  if (chocolates.length === 0)
    return res.status(200).send('There is no chocolates yet😊');

  res.send(chocolates);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedChocolate = await Chocolate.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      nameAr: req.body.nameAr,
      size: req.body.size,
      image: req.file?.filename,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send('Updated Successfully!');
});

exports.deleteChocolate = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Chocolate.findByIdAndDelete(id);
  return res.status(200).send('Chocolate deleted successfully!');
});
