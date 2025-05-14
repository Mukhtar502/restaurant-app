const Order = require("../models/order.model");
const Dish = require("../models/dish.model");

async function createOrder(req, res) {
  try {
    const { dishes } = req.body;
    let totalPrice = 0;
    for (const eachDish of dishes) {
      const dish = await Dish.findById(eachDish.dishId);
      if (!dish) {
        return res.status(404).json({
          message: "dish not found",
        });
      }
      totalPrice += dish.price * eachDish.quantity;
    }
    const order = new Order({
      user: req.user._id,
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
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate({
        path: "user",
        select: "name, email, address, phone_number",
      })
      .populate({
        path: "dishes.dishId",
        select: "name, category.enum, price, image",
      });
    res.json(orders);
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("dishes.dishId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "order not found!" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createOrder,
  getOneUserOrders,
  getAllOrders,
  updateOrderStatus,
};
