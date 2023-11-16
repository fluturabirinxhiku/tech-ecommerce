const express = require("express");
const router = express.Router();
const {
  getCoupons,
  createCoupon,
  deleteCoupon,
} = require("../controllers/couponController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
router.post(
  "/admin/coupons/new",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  createCoupon
);
router.get(
  "/admin/coupons",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getCoupons
);
router.delete(
  "/admin/coupons/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  deleteCoupon
);

module.exports = router;
