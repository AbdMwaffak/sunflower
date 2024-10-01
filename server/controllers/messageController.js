const AppError = require('../utils/appError');
const Message = require('./../models/messageModel');
const catchAsync = require('./../utils/catchAsync');
const Features = require('./../utils/features');

exports.sendMessage = catchAsync(async(req,res,next)=>{
  const userId = req.user.id;
  const {message} = req.body;
  if(message.trim()==='')return res.status(401).send('You Cannot Send Empty Message!');
  const {username:name,image}  = req.user;
  
  await Message.create({message , userId , userDetails:{name,image}});
  res.status(201).send('Message has been sent 📩');
})

exports.replyToMessage = catchAsync(async (req,res,next)=>{
  const messageId = req.params.id;
  const {reply} = req.body;
  if(reply.trim() !== '')
    await Message.findByIdAndUpdate(messageId,{
      reply,
      isReplied : true
  },{
    new : true,
    runValidators : true
  })

  return res.status(200).send('Reply has been sent 📩');
})

exports.getAll = catchAsync(async (req,res,next)=>{
  const features = new Features(Message.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const messages = await features.query.sort({ createdAt: -1 });
  res.status(200).send(messages);
})

exports.getMyMessages = catchAsync(async (req,res,next)=>{
  const userId = req.user.id;
  const messages = await Message.find({userId});
  res.status(200).send(messages);
})

exports.getById = catchAsync(async(req,res,next)=>{
  const { id } = req.params;
  const message = await Message.findById(id);
  res.status(200).send(message);
})

exports.deleteMessage = catchAsync(async(req,res,next)=>{
  const messageId = req.params.id;
  const message = await Message.findById(messageId);
  if(!message)return next(new AppError('Message not found',404));

  if(message.userId.toString() === req.user.id.toString() ||
    req.user.role === 'admin'){
    await Message.findByIdAndDelete(messageId);
    return res.status(200).send('The Message Deleted Successfully!');
  }
  return next(new AppError('Something went wrong',500));

})