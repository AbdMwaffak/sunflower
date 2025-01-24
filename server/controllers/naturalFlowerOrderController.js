const Band = require('../models/bandModel');
const Paper = require('../models/paperModel');
const Chocolate = require('../models/chocolateModel');
const NaturalFlowerOrder = require('../models/naturalFlowerOrderModel');
const catchAsync = require('../utils/catchAsync');
const ShoppingCart = require('../models/shoppingCartModel');
const perfumeOrder = require('../models/perfumeOrderModel');
const NaturalFlower = require('../models/NaturalFlowerModel');
const AppError = require('../utils/appError');

exports.add = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const itContainsProducts = await ShoppingCart.exists({ userId });
  const itContainssPerfumes = await perfumeOrder.exists({
    userId,
    activeSC: true,
  });
  if (itContainsProducts || itContainssPerfumes) {
    return res.send('Complete the order in the shopping cart first ❤');
  }
  let chocolates = [];
  let totalPrice = 0;
  const { naturalFlower, message, chocolate, details } = req.body;
  const naturalFlowerRequired = await NaturalFlower.findById(naturalFlower);
  totalPrice += naturalFlowerRequired.price;
  // const band = await Band.findById(details.band);
  // const paper = await Paper.findById(details.paper);

  for (let i = 0; i < chocolate.length; i++) {
    const ch = await Chocolate.findById(chocolate[i].id);
    chocolates.push({
      kind: ch.name,
      size: ch.size,
      image: ch.image,
      count: chocolate[i].count,
    });
    totalPrice += ch.price * chocolate[i].count;
  }
  await NaturalFlowerOrder.create({
    message,
    userId,
    naturalFlower,
    chocolates,
    // details: { band: band.color, paper: paper.color },
    totalPrice,
  });
  res.status(201).send('DONE!');
});

exports.deleteNFOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const naturalFlowerOrder = await NaturalFlowerOrder.findById(id).select(
    'userId'
  );
  if (!naturalFlowerOrder)
    return next(new AppError('natural flower order not found', 404));

  if (req.user.id.toString() !== naturalFlowerOrder.userId.toString())
    return next(new AppError('Something went wrong 🕵️‍♀️'));

  await NaturalFlowerOrder.findByIdAndDelete(id);
  res.status(200).send('Natural Flower Order Deleted Successfully 😔');
});

/*
  {
    "naturalFlower" : "65f4a9b3c2d670f973cdd7f2",
    "chocolate" : [
        {
            "id" : "65f4ad725bab916d81362535",
            "count" : 5
        }
    ],
    "details" : {
      "band" : "65e3a92adaddc3b45958775f",
      "box" : "65e3a712233db70d148912d5"
    }
}
*/
