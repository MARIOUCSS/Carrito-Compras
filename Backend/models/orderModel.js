const mongoose = require("mongoose");
const order = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {
      type: Number,
    },
    buyer: {
      // type: mongoose.ObjectId,
      // ref: "Users",
      type: String,
      required: true,
    },
    status: {
      type: String,
      // default: "Not Process",
      // enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", order);
