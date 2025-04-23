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
const validateId = require("../middlewares/objectIdValidator.middleware");

//routes for everyone
router.get("/", getAllDishes);
router.get("/:id", validateId, getDishById);

//private routes
router.post("/", protect, isAdmin, createDish);
router.put("/:id", protect, isAdmin, validateId, updateOneDish);
router.delete("/:id", protect, isAdmin, validateId, deleteDish);
module.exports = router;
