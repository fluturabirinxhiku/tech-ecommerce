const express = require("express");
const passport = require("passport");

const router = express.Router();
const { check } = require("express-validator");

const {
  forgotPassword,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
} = require("../controllers/authController.js");
const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middlewares/authMiddleware.js");
const {
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");

router.post(
  "/register",

  registerUser
);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.get("/profile", isAuthenticatedUser, getUserProfile);
router.get("/user", getUser);
router.put("/profile", isAuthenticatedUser, updateProfile);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getUsers
);
router.get(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getUser
);
router.put(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  updateUser
);
router.delete(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  deleteUser
);

router.put(
  "/reviews",
  isAuthenticatedUser,
  authorizeRoles("Customer"),
  createProductReview
);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
