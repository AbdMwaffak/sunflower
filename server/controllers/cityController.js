const AppError = require('../utils/appError');
const City = require('./../models/cityModel');
const catchAsync = require('./../utils/catchAsync');

exports.add = catchAsync(async(req,res,next)=>{
    const {name} = req.body;
    const neighborhoods = JSON.parse(req.body.neighborhoods);
    const city = await City.create({name , neighborhoods});

    res.status(201).send(city);
})

exports.getAll = catchAsync(async(req,res,next)=>{
    const cities = await City.find({isActive : true});
    res.status(200).send(cities);
})

exports.getById = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    const city = await City.findById(id);
    if(!city)return next(new AppError('City Not Found' , 404));

    res.status(200).send(city);
})

exports.update = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const city = await City.findById(id);
    const {neighborhoods} = city;
    neighborhoods = JSON.parse(req.body.neighborhoods) ?? neighborhoods ;
    const updatedCity = await City.findByIdAndUpdate(
      id,
      {
        name : req.body.name,
        neighborhoods,
        isActive : req.body.isActive
    },
      {
        new: true,
        runValidators: true,
      }
    );
  
    res.send(updatedCity);
})

exports.deleteCity = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    await City.findByIdAndDelete(id);
    res.status(200).send('City has Removed Successfully!');
})