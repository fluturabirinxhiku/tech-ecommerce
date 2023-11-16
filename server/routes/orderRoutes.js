const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  newOrder,
  getOrder,
  getUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/orders/new", isAuthenticatedUser, newOrder);

router.get("/customer/orders", isAuthenticatedUser, getUserOrders);
router.get("/orders/:id", isAuthenticatedUser, getOrder);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getAllOrders
);
router.put(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  updateOrder
);
router.delete(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  deleteOrder
);

module.exports = router;
