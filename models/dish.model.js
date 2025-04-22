const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["main", "extra", "drinks"],
      required: true,
    },
    price: { type: Number, required: true },
    image: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Dish", dishSchema);
