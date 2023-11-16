const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const HttpError = require("../utils/HttpError");
const asyncHandler = require("express-async-handler");

exports.newOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,

    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,

    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new HttpError("No Order found with this ID", 404));
  }

  res.status(200).json({
    order,
  });
});

exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "user",
    "name email"
  );

  res.status(200).json({
    orders,
  });
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    totalAmount,
    orders,
  });
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new HttpError("You have already delivered this order", 400));
  }

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new HttpError("No Order found with this ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
