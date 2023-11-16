const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const HttpError = require("../utils/HttpError");
const ApiFeatures = require("../utils/ApiFeatures");
const dotenv = require("dotenv");

dotenv.config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.processPayment = asyncHandler(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendStripeApiKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
