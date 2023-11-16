const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getAdminProducts,
  newProduct,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const express = require("express");

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/:id", getProductById);
router.put(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  updateProduct
); //ADMIN
router.delete(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  deleteProduct
); //ADMIN
router.get("/products/categories/:category", getProductsByCategory);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  getAdminProducts
);

router.post(
  "/admin/products/new",
  isAuthenticatedUser,
  authorizeRoles("Admin"),
  newProduct
);

module.exports = router;
