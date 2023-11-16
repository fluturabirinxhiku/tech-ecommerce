const HttpError = require("../utils/HttpError");

exports.notFound = (req, res, next) => {
  throw new HttpError(`Not Found - ${req.originalUrl}`, 404);
};

exports.errorHandler = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  if (error.name === "CastError") {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new HttpError(message, 400);
  }
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((value) => value.message);
    error = new HttpError(message, 400);
  }
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    error = new HttpError(message, 400);
  }

  if (error.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try Again!";
    error = new HttpError(message, 400);
  }

  if (error.code === 51091) {
    error = new HttpError(error.message, 400);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
};
