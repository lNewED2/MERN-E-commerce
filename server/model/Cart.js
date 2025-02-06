const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    ProductId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CartModel = module("Cart", CartSchema);
module.exports = CartModel;