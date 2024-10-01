const Product = require('./../models/productModel');
const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');
const Features = require('./../utils/features');
const User = require('../models/userModel');

exports.add = catchAsync(async (req, res, next) => {

  const category = await Category.findById(req.body.category);
  const images = req.files.map(img => img.filename);
  const colors = JSON.parse(req.body.colors);
  const sizes = JSON.parse(req.body.sizes);
  const product = await Product.create({ ...req.body,colors,sizes, categoryName: category.name.toLowerCase() , images});
  res.status(201).send(product);
});


exports.getAll = catchAsync(async (req,res,next)=>{

  const features = new Features(Product.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

const products = await features.query.sort({ createdAt: -1 }).lean();
  if (req.headers.authorization) {
    const userId = req.ID;
    const user = await User.findById(userId);
    products.forEach(product =>{
      product.isFavorite = user.favoriteProducts.includes(product._id);

    })
    }


  res.status(200).json(products);
})

exports.getById = catchAsync (async (req,res,next)=>{
  const {id} = req.params;
  const product = await Product.findById(id);
  await Product.findByIdAndUpdate(id, {
    $inc: { popularity: 1 },
  });

  res.status(200).send(product);
})

exports.update = catchAsync(async (req,res,next)=>{
  const {id} = req.params;
  const product = await Product.findById(id);
  let {images , colors , sizes} = product;
  colors = JSON.parse(req.body.colors || null) ?? colors ;
  sizes = JSON.parse(req.body.sizes || null) ?? sizes ;
  // colors = req.body.colors ?? colors ;
  // sizes = req.body.sizes ?? sizes ;
  
  if(req.files.length > 0){
    images = req.files.map(img => img.filename);
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      price : req.body.price,
      images,
      description : req.body.description,
      colors,
      sizes
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send(updatedProduct);
})


exports.searchProducts = catchAsync(async (req, res, next) => {
    const { query } = req.query; // The search term from query string (e.g. /search?query=someText)

    if (!query) {
        return next(new AppError('Please provide a search query.', 400));
    }

    // Search criteria for name, categoryName, and description
    const searchCriteria = {
        $or: [
            { name: { $regex: query, $options: 'i' } },  // Search by name (case-insensitive)
            { categoryName: { $regex: query, $options: 'i' } },  // Search by category name (case-insensitive)
            { description: { $regex: query, $options: 'i' } }  // Search by description (case-insensitive)
        ]
    };

    // Search the products based on the search criteria
    const products = await Product.find(searchCriteria);

    if (!products || products.length === 0) {
        return res.status(404).send({ message: 'No products found' });
    }

    res.status(200).send(products);
});


exports.getSuggestedProducts = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('There is no product with this Id!', 404));
  }

  let suggestedProducts = [];
  let ids = new Set(suggestedProducts.map((d) => d.id));

  const similarProducts = await Product.find({ categoryName: product.categoryName, isActive: true });
  suggestedProducts = [...similarProducts].filter((d) => {
    if (!ids.has(d.id) && d.id != product.id) {
      ids.add(d.id);
      return d;
    }
  });

  const mostPop = await Product.find({ isActive: true }).sort({ popularity: -1 });
  suggestedProducts = [
    ...suggestedProducts,
    ...mostPop.filter((d) => {
      if (!ids.has(d.id) && d.id != product.id) return d;
    }),
  ];

  res.send(suggestedProducts.slice(0, 8));
});