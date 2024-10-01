const AppError = require("../utils/appError");

handleCastErrorDB = (err)=>{
    const message = `invalid ${err.path} : ${err.value}`;
    return new AppError(message , 400) // Bad Request
    // return AppError to make the error operational
}

handleValidatorError = (err)=>{
  const message = err.message;
  return new AppError(message , 500);
}

const sendErrorDev = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/')) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
    }
    // B) RENDERED WEBSITE
    // console.error('ERROR 💥', err);
    // return res.status(err.statusCode).render('error', {
    //   title: 'Something went wrong!',
    //   msg: err.message
    // });
  };
  
  const sendErrorProd = (err, req, res) => {
    // A) API
    //  res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    //   });
      console.log(err.isOperational)
    if (req.originalUrl.startsWith('/')) {
      // A) Operational, trusted error: send message to client
      if (err.isOperational) {
        return res.status(err.statusCode).json({
          status: err.status,
          message: err.message
        });
      }
      // B) Programming or other unknown error: don't leak error details
      // 1) Log error
    //   console.error('ERROR 💥', err);
    //   // 2) Send generic message
    //   return res.status(500).json({
    //     status: 'error',
    //     message: 'Something went very wrong!'
    //   });
    }
}



module.exports = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);

    } else if (process.env.NODE_ENV === 'production') {

      let error = { ...err };
      error.message = err.message;
      if (err.name === 'CastError') error = handleCastErrorDB(error);
      if(error.name === 'ValidatorError') error = handleValidatorError(error);
        sendErrorProd(error, req, res);
    }
  };
  
//   npm run start:prod