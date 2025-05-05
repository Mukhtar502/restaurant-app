const Dish = require("../models/dish.model");
const { validateObjectId } = require("../utils/validateObjectId");
//create new dish(can be done by only admin)
async function createDish(req, res) {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json(dish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//get all dishes
async function getAllDishes(req, res) {
  try {
    const dishes = await Dish.find();
    res.status(201).json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//get a single dish by ID
async function getDishById(req, res) {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.json(500).json({ message: error.mesage });
  }
}

//update a dish(admin only)

async function updateOneDish(req, res) {
  try {
    validateObjectId(req.params.id);
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//delete one dish by ID
async function deleteDish(req, res) {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) {
      return res.status(500).json({ message: "dish not found" });
    }
    res.status(200).json({ message: "dish deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllDishes,
  getDishById,
  createDish,
  deleteDish,
  updateOneDish,
};
