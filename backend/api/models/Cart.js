const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    userID: {
      type: String,
    },
    list: [
      {
        optionID: {
          type: String,
          ref: "Option",
        },
        quantity: { type: Number, default: 1 },
        color: String,
      },
    ],
  },
  { timestamps: true },
  { collection: "carts" }
);
module.exports = mongoose.model("Cart", Cart);
