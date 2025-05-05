const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dishes: [
    {
      dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "preparing", "on the way", "delivered", "cancelled"],
    default: "pending",
  },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", orderSchema);
