const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const HttpError = require("../utils/HttpError");
const { sendToken } = require("../utils/JWToken");
const { sendEmail } = require("../utils/sendEmail");
const { validationResult } = require("express-validator");
const crypto = require("crypto");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role = "Customer" } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendToken(user, 201, res);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new HttpError("Please enter email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new HttpError("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new HttpError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new HttpError("User with this email not found ", 404));
  }
  const resetToken = await user.getPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follows:\n\n${resetURL}\n\nIf you have not requested this token, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "TechShop Password Reset",
      message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new HttpError(error.message, 500));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new HttpError("Password reset token is invalid or has expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new HttpError("Password does not match", 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    user,
  });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new HttpError("Password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//ADMIN ROUTES

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 });

  if (!users) {
    return next(new HttpError("There are no users"));
  }

  res.status(200).json({
    users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new HttpError("User not found"));
  }
  res.status(200).json({
    user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
    new: true,

    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new HttpError("User not found"));
  }

  await user.remove();
  res.status(200).json({
    success: true,
  });
});
