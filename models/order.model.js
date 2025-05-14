const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dishes: [
      {
        dishId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
          required: true,
        },
        quantity: { type: Number, required: true },
        _id: false,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "preparing", "on the way", "delivered", "cancelled"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: true, // Keep createdAt
      updatedAt: false,
    },
    id: false, // ← This is the key to disable virtual id
  }
);

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.createdAt = new Date(ret.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    // Reorder fields with _id first
    const { _id, ...rest } = ret;
    return { _id, ...rest };
  },
});

module.exports = mongoose.model("Order", orderSchema);
