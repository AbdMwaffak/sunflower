const Offer = require('./../models/offerModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Features = require('./../utils/features');

exports.add = catchAsync(async (req, res, next) => {
  const mainImage = `${process.env.HOST}/offers/${req.file.filename}`;
  const offer = await Offer.create({ ...req.body, mainImage });

  if (!offer) return next(new AppError('something went wrong', 500));

  res.status(201).send('Offer has Created Successfully🌹');
});

exports.addProductToOffer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const offer = await Offer.findById(id);
  if (!offer) return next(new AppError('Offer not found', 404));

  const { description, descriptionAr, nameAr, name } = req.body;
  const image = `${process.env.HOST}/offers/${req.file.filename}`;

  await Offer.findByIdAndUpdate(id, {
    $push: { products: { description, image, name, nameAr, descriptionAr } },
  });

  res.status(201).send('Product added Successfully!');
});

exports.removeProductFromOffer = catchAsync(async (req, res, next) => {
  const { offerId, productId } = req.params;
  const offer = await Offer.findById(offerId);
  if (!offer) return next(new AppError('Offer not found', 404));

  await Offer.findByIdAndUpdate(offerId, {
    $pull: { products: { _id: productId } },
  });

  res.status(200).send('Product removed Successfully!');
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const offer = await Offer.findById(id);
  if (!offer)
    return next(new AppError('There is no offer with this id🤔', 404));

  return res.status(200).send(offer);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new Features(Offer.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const offers = await features.query.sort({ createAt: -1 });

  res.send(offers);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const offer = await Offer.findById(id);
  if (!offer) return next(new AppError('offer not found🤔', 404));
  let { mainImage } = offer;

  if (req.file) {
    mainImage = `${process.env.HOST}/offers/${req.file.filename}`;
  }
  const updatedOffer = await Offer.findByIdAndUpdate(
    id,
    {
      ...req.body,
      mainImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).send('Updated Succcessfully!');
});

exports.deleteOffer = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  await Offer.findByIdAndDelete(id);
  return res.status(200).send('Offer has deleted successfully!');
});

exports.updateOfferProducts = catchAsync(async (req, res, next) => {
  const { offerId, productId } = req.params;
  const offer = await Offer.findById(offerId);
  if (!offer) return next(new AppError('Offer not found', 404));

  if (req.file) {
    image = `${process.env.HOST}/offers/${req.file.filename}`;
    req.body = { ...req.body, image };
  }
  const updated = await updateProductInOffer(offer, productId, req.body);
  return updated
    ? res.status(200).send('product updated successfully!')
    : res.status(500).send('something went wrong!');
});

exports.changeState = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const offer = await Offer.findById(id);
  if (!offer) return next(new AppError('offer not found', 404));

  await Offer.findByIdAndUpdate(
    id,
    {
      isActive: !offer.isActive,
    },
    {
      runValidators: true,
    }
  );
  res.status(200).send('Offer state has changed');
});

async function updateProductInOffer(offer, productId, updatedProductData) {
  try {
    // Find the index of the product to be updated
    const productIndex = offer.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return false;
    }

    offer.products[productIndex] = {
      ...offer.products[productIndex].toObject(),
      ...updatedProductData,
    };

    // Save the updated offer document
    await offer.save();
    return true;
  } catch (error) {
    return false;
  }
}
