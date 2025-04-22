const express = require("express");
const router = express.Router();
const {
  getAllDishes,
  getDishById,
  createDish,
  deleteDish,
  updateOneDish,
} = require("../controllers/dish.controller");

const protect = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/role.middleware");

//routes for everyone
router.get("/", getAllDishes);
router.get("/:id", getDishById);

//private routes
router.post("/", protect, isAdmin, createDish);
router.put("/:id", protect, isAdmin, updateOneDish);
router.delete("/:id", protect, isAdmin, deleteDish);
module.exports = router;
