const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.addToFavorite = catchAsync(async (req,res,next)=>{
    const userId = req.user.id;
    const {productId} = req.body;
    if(!productId)
        return next(new AppError('something went wrong while adding the product to favorite',500));
    const user = await User.findById(userId);
        if (!user) {
            return next(new AppError('User not found!' , 404));
        }
    await User.findByIdAndUpdate(userId,
        {
            $addToSet:{
                favoriteProducts: productId
            } 
        },
        { new: true })
    return res.send('Product added to favorite 👍')
})

exports.removeFromFavorite = catchAsync (async (req,res,next)=>{
    const userId = req.user.id;
    const {productId} = req.body;
    const user = await User.findById(userId);
        if (!user) {
            return next(new AppError('User not found!' , 404));
        }
    await User.findByIdAndUpdate(userId, { $pull: { favoriteProducts: productId } }, { new: true });

    return res.send('Product removed from favorite 👍')
})

exports.addRemoveFromFavorite = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { productId } = req.body;

    // Validate productId
    if (!productId) {
        return next(new AppError('Product ID is required', 400));
    }

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('User not found!', 404));
    }

    // Check if product is already in the favoriteProducts array
    const isFavorite = user.favoriteProducts.includes(productId);

    if (isFavorite) {
        // If product is already in favorites, remove it
        await User.findByIdAndUpdate(userId, {
            $pull: { favoriteProducts: productId }
        }, { new: true });
        return res.send('Product removed from favorite 👍');
    } else {
        // If product is not in favorites, add it
        await User.findByIdAndUpdate(userId, {
            $addToSet: { favoriteProducts: productId }
        }, { new: true });
        return res.send('Product added to favorite 👍');
    }
});


exports.getFavorite = catchAsync(async(req,res,next)=>{
    
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    if(!user)return next(new AppError('user not found',404));

    const Favorites = user.favoriteProducts; 
    
    if(Favorites && Favorites.length > 0){
       const populatedFavorites = await Product.find({_id: { $in: Favorites }});
       return res.status(200).send(populatedFavorites);
    }
    return res.status(200).send([])
})

exports.emptyFavorite = catchAsync(async(req,res,next)=>{
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId , {
        favoriteProducts : []
    })

    return res.status(200).send('The Favorite has been emptied');
})

exports.me = catchAsync(async (req,res,next)=>{
    if(req.user){
        return res.status(200).send(req.user);
    }
    return next(new AppError('You are not logged in' , 500));
})