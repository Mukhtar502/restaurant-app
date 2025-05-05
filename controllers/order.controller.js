const Order = require("../models/order.model");
const Dish = require("../models/dish.model");

async function createOrder(req, res) {
  try {
    const { dishes } = req.body;
    let totalPrice = 0;
    for (const eachDish of dishes) {
      const dish = await Dish.findById(eachDish.dishId);
      if (!dish) {
        res.status(404).json({
          message: "dish not found",
        });
      }
      totalPrice += dish.price * eachDish.quantity;
    }
    const order = new order({
      user: req.user.userId,
      dishes,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getOneUserOrders(req, res) {
  
}

module.exports = { createOrder };
