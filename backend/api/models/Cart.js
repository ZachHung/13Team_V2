const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Option = "./Option";

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
  { collection: "carts" }
);
module.exports = mongoose.model("Cart", Cart);
