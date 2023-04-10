import AppError from '../utils/appError.js';

const handleValidationError = (error) => {
  const messages = Object.values(error.errors).map((el) => el.message);
  return new AppError(messages.join(``), 400);
};

const handleObjectIdDB = (error) => {
  const message = `Wrong id : ${error.value} for the path: ${error.path}`;
  return new AppError(message, 404);
};

const handleDuplicateValueDb = (error) => {
  const message = `You already have a tour named ${error.keyValue.name}, please try some other names`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      error: err,
      stack: err.stack,
      status: err.status,
      message: err.message,
    });
  }
  console.error(`ERROR: ${err}`);
  return res.status(err.statusCode).render('error', {
    title: 'something went very wrong',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.error(`ERROR: ${err}`);
    return res.status(err.statusCode).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'something went very wrong',
      msg: err.message,
    });
  }
  console.error(`ERROR: ${err}`);
  return res.status(err.statusCode).render('error', {
    msg: 'Please try again later',
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.status ||= 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    console.log(error);
    if (error.code === 11000) error = handleDuplicateValueDb(error);
    if (error.kind === 'ObjectId') error = handleObjectIdDB(error);
    if (error._message === 'Validation failed')
      error = handleValidationError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
