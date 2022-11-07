

//middlewares tipo error globales

//capturamos errores
const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

//damos formato al error
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

//error handler con boom
const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
};
