const catchAsync = require('../utils/catchAsync');
const ShoppingCart = require('../models/shoppingCartModel');
const NaturalFlowerOrder = require('../models/naturalFlowerOrderModel');
const perfumeOrder = require('../models/perfumeOrderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.add = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { product, quantity, paymentMethod, message } = req.body;
  const userId = req.user.id;
  // Check If The Basket Contains Flowers
  const itContainsNaturalFlowers = await NaturalFlowerOrder.exists({
    userId,
    activeSC: true,
  });
  if (itContainsNaturalFlowers) {
    return res.send('Complete the order of flower first ❤');
  }

  let addProcess;
  const curProduct = await Product.findById(product);
  // Check If The Payment Method Is 'POINTS'
  if (paymentMethod.toLowerCase() === 'points') {
    const priceInPoints = curProduct.priceInPoints;
    const available = curProduct.isActive;
    const isAvailableToSellInPoints = curProduct.isAvailableToSellInPoints;
    if (
      available &&
      isAvailableToSellInPoints &&
      req.user.points >= priceInPoints
    ) {
      addProcess = await addProductToCart(
        priceInPoints,
        userId,
        'pointsProducts',
        product,
        quantity,
        message
      );
    } else return res.status(400).send("⚠You Can't Buy This Product By Points");

    if (addProcess) {
      const user = await User.findById(userId);
      await User.findByIdAndUpdate(userId, {
        points: user.points - priceInPoints,
      });
      return res.status(201).send('Product Added To Shopping Cart 🛒');
    }
  }

  // Check If The Payment Method Is 'MONEY'
  if (paymentMethod.toLowerCase() === 'money') {
    const price = curProduct.price;
    addProcess = await addProductToCart(
      price,
      userId,
      'moneyProducts',
      product,
      quantity,
      message
    );
    if (addProcess)
      return res.status(201).send('Product Added To Shopping Cart 🛒');
  }
  return next(new AppError('you did not specified the payment method', 401));
});

exports.addOfferToShoppingCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const itContainsNaturalFlowers = await NaturalFlowerOrder.exists({
    userId,
    activeSC: true,
  });
  if (itContainsNaturalFlowers) {
    return res.send('Complete the order of flower first ❤');
  }

  const { offerId, quantity, message } = req.body;
  let cart = await ShoppingCart.findOne({ userId });
  if (cart) {
    let itemIndex = cart['offers'].findIndex(
      (p) => p.offerId.toString() === offerId.toString()
    );
    if (itemIndex > -1) {
      //offer exists in the Cart, update the quantity
      let offer = cart['offers'][itemIndex];
      offer.quantity = quantity ?? offer.quantity;
      cart['offers'][itemIndex] = offer;
    } else {
      //product does not exists in cart, add new item
      cart.offers.push({ offerId, message });
      cart.modifiedOn = new Date();
    }
    cart = await cart.save();
    res.status(200).send('Done!');
  } else {
    //no cart for user, create new cart
    const newCart = new ShoppingCart();
    newCart.userId = userId;
    newCart.offers = [{ offerId, message }];
    await newCart.save();
    res.status(200).send('Done!');
  }
});

exports.deleteOfferFromShoppingCart = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  const cart = await ShoppingCart.findOne({
    userId,
    'offers._id': id,
  });
  if (!cart) return next(new AppError('offer not found', 404));

  await ShoppingCart.findOneAndUpdate(
    { userId },
    { $pull: { offers: { _id: id } } }
  );

  res.status(200).send('Offer Deleted Succussfully!');
});

exports.deleteFromSC = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { paymentMethod } = req.body;
  let cart = await ShoppingCart.findOne({ userId });

  if (paymentMethod.toLowerCase() === 'money') {
    cart.moneyProducts = cart.moneyProducts.filter(
      (item) => item._id.toString() !== req.params.id
    );
    cart.modifiedOn = new Date();
    cart = await cart.save();
    return res.status(201).send('Done!');
  }
  if (paymentMethod.toLowerCase() === 'points') {
    const deletedProduct = cart.pointsProducts.find(
      (p) => p._id.toString() === req.params.id
    );
    cart.pointsProducts = cart.pointsProducts.filter(
      (item) => item._id.toString() !== req.params.id
    );
    cart.modifiedOn = new Date();
    cart = await cart.save();
    const user = await User.findById(userId);
    await User.findByIdAndUpdate(userId, {
      points: user.points + deletedProduct.price,
    });
    return res.status(201).send('Done');
  }

  return res.status(500).send('The Process Of Deleting Failed');
});

exports.get = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  let products, naturalFlowers, perfumes, offers;
  let pointsEarned = 0;

  const itContainsNaturalFlowers = await NaturalFlowerOrder.exists({
    userId,
    activeSC: true,
  });
  let itContainsProducts, itContainssPerfumes;

  if (itContainsNaturalFlowers) {
    naturalFlowers = await NaturalFlowerOrder.find({
      userId,
      activeSC: true,
    }).populate({
      path: 'naturalFlower',
      select: '_id -description',
    });

    return res.status(200).json({
      cart: { naturalFlowers, perfumes: [], products: [], offers: [] },
    });
  } else {
    itContainsProducts = await ShoppingCart.exists({ userId, active: true });
    itContainssPerfumes = await perfumeOrder.exists({ userId, activeSC: true });
  }

  if (!itContainsProducts && !itContainssPerfumes)
    return res.status(200).json({
      cart: { naturalFlowers: [], perfumes: [], products: [], offers: [] },
    });
  else {
    if (itContainsProducts) {
      products = await ShoppingCart.findOne({ userId, active: true })
        .populate({
          path: 'moneyProducts.product',
          select: 'name nameAr price images _id pointsEarned',
        })
        .populate({
          path: 'pointsProducts.product',
          select: 'name nameAr price images _id',
        })
        .populate({
          path: 'offers.offerId',
          select: '-description -products -isActive -discount -withPriceB',
        });

      products = products.toObject();
      offers = [...products.offers];
      delete products.offers;
      offers = offers?.map((offer) => {
        return {
          _id: offer?._id,
          name: offer?.offerId?.name,
          nameAr: offer?.offerId?.nameAr,
          priceB: offer?.offerId?.priceB,
          priceA: offer?.offerId?.priceA,
          mainImage: offer.offerId?.mainImage,
          quantity: offer?.quantity,
          offerId: offer?.offerId?._id,
        };
      });

      for (let el of products.moneyProducts) {
        const product = await Product.findById(el.product._id);
        const index = product.sizes.map((item) => item.size).indexOf(el.size);
        const points = product.pointsEarned;
        pointsEarned += points * el.quantity;
      }
      products.pointsEarned = pointsEarned;
    }

    if (itContainssPerfumes)
      perfumes = await perfumeOrder.find({ userId, activeSC: true });
  }

  return res.status(200).json({
    cart: {
      products:
        products?.moneyProducts?.length === 0 &&
        products?.pointsProducts?.length === 0
          ? []
          : products,
      naturalFlowers: [],
      perfumes: perfumes ? perfumes : [],
      offers: offers ? offers : [],
    },
  });
});

exports.emptyTheBasket = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const itContainsNaturalFlowers = await NaturalFlowerOrder.find({
    userId,
    activeSC: true,
  });
  if (itContainsNaturalFlowers.length > 0) {
    for (let i = 0; i < itContainsNaturalFlowers.length; i++) {
      await NaturalFlowerOrder.findByIdAndDelete(
        itContainsNaturalFlowers[i]._id
      );
    }
    return res.status(200).send('The basket has been emptied');
  }

  itContainsPerfumes = await perfumeOrder.find({ userId, activeSC: true });
  if (itContainsPerfumes.length > 0) {
    for (let i = 0; i < itContainsPerfumes.length; i++) {
      await perfumeOrder.findByIdAndDelete(itContainsPerfumes[i]);
    }
  }
  itContainsProducts = await ShoppingCart.exists({ userId });
  if (itContainsProducts) {
    // return the points to the user
    const cart = await ShoppingCart.findOne({ userId });
    if (cart?.pointsProducts?.length > 0) {
      for (let i = 0; i < cart.pointsProducts.length; i++) {
        const user = await User.findById(userId);
        await User.findByIdAndUpdate(userId, {
          points: user.pionts + cart.pointsProducts[i].price,
        });
      }
    }
    await ShoppingCart.findOneAndDelete({ userId });
  }

  return res.status(200).send('The basket has been emptied');
});

async function addProductToCart(
  price,
  userId,
  productsArray,
  product,
  quantity = 1,
  message
) {
  let cart = await ShoppingCart.findOne({ userId });
  if (cart) {
    let itemIndex = cart[productsArray].findIndex(
      (p) => p.product.toString() === product.toString()
    );
    if (itemIndex > -1) {
      //product exists in the moneyCart, update the quantity or the size
      let productItem = cart[productsArray][itemIndex];
      productItem.quantity = quantity ?? productItem.quantity;
      cart[productsArray][itemIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart[productsArray].push({ product, quantity, price, message });
      cart.modifiedOn = new Date();
    }
    cart = await cart.save();
    return true;
  } else {
    //no cart for user, create new cart
    const newCart = new ShoppingCart();
    newCart.userId = userId;
    newCart[productsArray] = [{ product, quantity, price, message }];
    await newCart.save();

    return true;
  }
}

exports.cart = async (userId) => {
  let products, naturalFlowers, perfumes, offers;
  let pointsEarned = 0;

  const itContainsNaturalFlowers = await NaturalFlowerOrder.exists({
    userId,
    activeSC: true,
  });
  let itContainsProducts, itContainssPerfumes;

  if (itContainsNaturalFlowers) {
    naturalFlowers = await NaturalFlowerOrder.find({
      userId,
      activeSC: true,
    }).populate({
      path: 'naturalFlower',
      select: '_id -description',
    });

    return { naturalFlowers, perfumes: [], products: [], offers: [] };
  } else {
    itContainsProducts = await ShoppingCart.exists({ userId, active: true });
    itContainssPerfumes = await perfumeOrder.exists({ userId, activeSC: true });
  }

  if (!itContainsProducts && !itContainssPerfumes)
    return { naturalFlowers: [], perfumes: [], products: [], offers: [] };
  else {
    if (itContainsProducts) {
      products = await ShoppingCart.findOne({ userId, active: true })
        .populate({
          path: 'moneyProducts.product',
          select: 'name price images _id pointsEarned',
        })
        .populate({
          path: 'pointsProducts.product',
          select: 'name price images _id',
        })
        .populate({
          path: 'offers.offerId',
          select: '-description -products -isActive -discount -withPriceB',
        });

      products = products.toObject();
      offers = [...products.offers];
      delete products.offers;
      offers = offers.map((offer) => {
        return {
          _id: offer._id,
          name: offer.offerId.name,
          priceB: offer.offerId.priceB,
          priceA: offer.offerId.priceA,
          mainImage: offer.offerId.mainImage,
          quantity: offer.quantity,
          offerId: offer.offerId._id,
        };
      });

      for (let el of products.moneyProducts) {
        const product = await Product.findById(el.product._id);
        const index = product.sizes.map((item) => item.size).indexOf(el.size);
        const points = product.sizes[index].pointsEarned;
        pointsEarned += points * el.quantity;
      }
      products.pointsEarned = pointsEarned;
    }

    if (itContainssPerfumes)
      perfumes = await perfumeOrder.find({ userId, activeSC: true });
  }

  return {
    products:
      products.moneyProducts?.length === 0 &&
      products.pointsProducts?.length === 0
        ? []
        : products,
    naturalFlowers: [],
    perfumes: perfumes ? perfumes : [],
    offers: offers ? offers : [],
  };
};
