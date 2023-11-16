const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);
router.get("/stripeapi", isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
