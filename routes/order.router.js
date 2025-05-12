const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOneUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const protect = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/role.middleware");
router.post("/", protect, createOrder);

router.get("/my-orders", protect, getOneUserOrders);
router.get("/", protect, isAdmin, getAllOrders);
router.patch("/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
