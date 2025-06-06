const Order = require('./../models/orderModel');
const ShoppingCart = require('./../models/shoppingCartModel');
// const { cart } = require('./shoppingCartController');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Features = require('./../utils/features');
const NaturalFlowerOrder = require('../models/naturalFlowerOrderModel');
const perfumeOrder = require('../models/perfumeOrderModel');
const { broadcastSSE } = require('./sseController'); // Import SSE broadcasting function
const User = require('../models/userModel');
const Product = require('../models/productModel');

exports.addOrder = catchAsync(async (req, res, next) => {
  console.log('BODY : ', req.body);
  const order = await Order.create({ ...req.body });
  if (!order) return next(new AppError('something went wrong', 500));

  let pointsEarned = 0;
  console.log(order.cart.products.moneyProducts);
  for (let i = 0; i < order?.cart?.products.moneyProducts?.length; i++) {
    pointsEarned +=
      order?.cart?.products?.moneyProducts[i]?.product?.pointsEarned;
  }

  const user = await User.findById(req.user.id);
  await User.findByIdAndUpdate(req.user.id, {
    points: user.points + pointsEarned,
    totalPoints: user.totalPoints + pointsEarned,
    ordersCount: user.ordersCount + 1,
  });
  await NaturalFlowerOrder.findOneAndDelete({
    userId: req.user.id,
    activeSC: true,
  });
  await perfumeOrder.findOneAndDelete({ userId: req.user.id, activeSC: true });
  await ShoppingCart.findOneAndDelete({ userId: req.user.id });
  // Broadcast the new order to all SSE clients
  broadcastSSE('admin', {
    type: 'NEW_ORDER',
    data: {
      order,
      user: req.user,
    },
  });
  res.status(201).send('Order has Created Successfully🌹');
});

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new Features(Order.find().populate('userId'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query.sort();

  res.send(orders);
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order)
    return next(new AppError('There is no offer with this id🤔', 404));

  return res.status(200).send(order);
});

exports.changeOrderState = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return next(new AppError('order not found', 404));

  await Order.findByIdAndUpdate(
    id,
    {
      orderStatus: req.body.orderStatus,
    },
    {
      runValidators: true,
    }
  );
  res.status(200).send('Order state has changed');
});
