const errorHandler = (err, req, res, next) => {
  err.statuscode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statuscode).json({
    msg: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
