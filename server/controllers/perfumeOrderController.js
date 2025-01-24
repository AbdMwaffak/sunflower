const NaturalFlowerOrder = require('../models/naturalFlowerOrderModel');
const PerfumeOrder = require('./../models/perfumeOrderModel');
const catchAsync = require('./../utils/catchAsync');

exports.add = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const itContainsNaturalFlowers = await NaturalFlowerOrder.exists({
    userId,
    activeSC: true,
  });
  if (itContainsNaturalFlowers) {
    return res.send('Complete the flower order first ❤');
  }
  const perfumeOrder = await PerfumeOrder.create({ ...req.body, userId });

  res.status(201).send('Order Added Successfully!');
});

exports.updateOrderVariants = catchAsync(async (req, res, next) => {
  const perfumeId = req.params.id;
  const { variantId, totalPrice } = req.body;
  delete req.body['totalPrice'];

  const fields = Object.entries(req.body).map(([key, value]) => [
    `perfumeOrderVariants.$.${key}`,
    value,
  ]);
  const update = Object.fromEntries(fields);

  await PerfumeOrder.findOneAndUpdate(
    { 'perfumeOrderVariants._id': variantId },
    { $set: update },
    { new: true, runValidators: true }
  );

  const updatedOrder = await PerfumeOrder.findByIdAndUpdate(
    perfumeId,
    { totalPrice },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send('Updated Successfully!');
});

exports.deletePerfumeOrder = catchAsync(async (req, res, next) => {
  const perfumeOrderId = req.params.id;
  await PerfumeOrder.findByIdAndDelete(perfumeOrderId);

  res.status(200).send('Perfume Order Deleted Successfully!');
});
