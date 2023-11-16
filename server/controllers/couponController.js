const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const HttpError = require("../utils/HttpError");

exports.getCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });

  if (!coupons) {
    return next(new HttpError("There are no coupons!", 404));
  }

  res.status(200).json({
    coupons,
  });
});
exports.createCoupon = asyncHandler(async (req, res, next) => {
  const { name, expiry, discount } = req.body;
  const coupon = await Coupon.create({
    name,
    expiry,
    discount,
  });

  res.status(201).json({
    coupon,
    success: true,
  });
});

exports.deleteCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new HttpError("Coupon not found!", 404));
  }

  await coupon.remove();

  res.status(200).json({
    success: true,
    message: "Coupon deleted successfully",
  });
});

//exports.getValidCoupom
//compare coupons
//add coupons to user model
