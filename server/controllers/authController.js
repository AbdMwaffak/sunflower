const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const util = require('util');
const {encrypt} = require('./../utils/endeCode');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    token,
    user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phone: req.body.phone,
    gender : req.body.gender,
    image: req.file.filename
  });
  
  res.locals._ = encrypt(newUser.id);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password are inputted
  if (!email || !password) {
    return next(new AppError('please provide email and password', 404));
  }
  // 2) check if email is exist and pasword is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user) 
  return next(new AppError('This email is not exist💔' , 404));

  const comparePasswords = await user.correctPassword(password, user.password);
  if (!comparePasswords) {
    return next(new AppError('Incorrect email or password!', 401));
  }
  
  const partialFavorites = user.favoriteProducts?.slice(0, 5); 
  const populatedFavorites = await Product.find({_id: { $in: partialFavorites }});
  user.favoriteProducts = populatedFavorites;

  res.locals._ = encrypt(user.id);
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does not longer exist!', 401));
    
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password , please login again!', 401));
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // roles : ['admin' , 'lead-guide']
      next(new AppError('You do not have permission to perform this action', 403)); // Forbidden!
    }
    next();
  };
};

exports.checkLogedUser = catchAsync(async (req,res,next)=>{
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    }
    if(!token)return next();

  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);  
  req.ID = decoded.id;
    
  next();
})