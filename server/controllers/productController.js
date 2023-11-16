const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const HttpError = require("../utils/HttpError");
const ApiFeatures = require("../utils/ApiFeatures");
const cloudinary = require("cloudinary");

exports.getProducts = asyncHandler(async (req, res, next) => {
  let resPerPage = 8;
  if (req.query.keyword) {
    resPerPage = 6;
  }

  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product, req.query, req.params)
    .search()
    .filter()
    .sortByDate();

  let products = await apiFeatures.dbQuery;
  const filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);

  products = await apiFeatures.dbQquery;

  if (!products.length) {
    return next(new HttpError("There are no products!", 404));
  }

  res.status(200).json({
    count: products.length,
    productCount,
    filteredProductsCount,
    products,
    resPerPage,
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const product = new Product(req.body);
  await product.save();

  res.status(201).json({
    product,
  });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HttpError("Product not found!", 404));
  }

  res.status(200).json({
    product,
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  //when untouched it retunrns the objects in the images array of products
  //when touched it returns strings

  if (images !== undefined) {
    // Deleting images associated with the product

    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HttpError("Product not found!", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

exports.getProductsByCategory = asyncHandler(async (req, res, next) => {
  const resPerPage = 6;

  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product, req.query, req.params)
    .search()
    .filter()
    .sortByDate();

  let products = await apiFeatures.dbQuery;
  const filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);

  products = await apiFeatures.dbQquery;

  if (!products.length) {
    return next(new HttpError("There are no products in this category!", 404));
  }
  res.status(200).json({
    count: products.length,
    productCount,
    filteredProductsCount,
    products,
    resPerPage,
  });
});

exports.getAdminProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });

  if (!products) {
    return next(new HttpError("There are no products!", 404));
  }

  res.status(200).json({
    products,
  });
});

exports.newProduct = asyncHandler(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new HttpError("Product not found!", 404));
  }
  if (!product.reviews) {
    return next(new HttpError("There are no reviews for this product!", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
