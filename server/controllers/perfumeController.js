const Perfume = require('./../models/perfumeModel');
const catchAsync = require('./../utils/catchAsync');

exports.add = catchAsync(async (req, res, next) => {
  const images = req.files?.map((img) => img.filename);
  const perfume = await Perfume.create({
    ...req.body,
    images: images ? images : [],
  });

  res.send(perfume);
});

exports.get = catchAsync(async (req, res, next) => {
  const perfumes = await Perfume.find();
  res.status(200).send(perfumes);
});

exports.updateVariants = catchAsync(async (req, res, next) => {
  const variantId = req.params.id;
  const fields = Object.entries(req.body).map(([key, value]) => [
    `variants.$.${key}`,
    value,
  ]);
  const update = Object.fromEntries(fields);

  const perfume = await Perfume.findOneAndUpdate(
    { 'variants._id': variantId },
    { $set: update },
    { new: true, runValidators: true }
  );

  res.send('Updated Successfully!');
});

exports.addNewSize = catchAsync(async (req, res, next) => {
  const perfume = await Perfume.findById(req.params.id);
  console.log('ERROR');
  if (!perfume) return next(new AppError('This ID is not exist', 404));
  const { size, price } = req.body;
  perfume.variants.push({ size, price });
  await perfume.save();

  res.status(201).send('New Size Added Successfully!');
});

exports.update = catchAsync(async (req, res, next) => {
  const perfumes = await Perfume.find();
  const perfume = perfumes[0];
  let { images } = perfume;
  const { name, description, descriptionAr } = req.body;

  if (req.files.length > 0) images = req.files.map((img) => img.filename);

  await Perfume.findByIdAndUpdate(perfume.id, {
    images,
    name,
    description,
    descriptionAr,
  });
  res.status(200).send('Perfume Updated Successfully!');
});
/*
 {
    "color": "Red",
    "size": "Large"
}

*/
