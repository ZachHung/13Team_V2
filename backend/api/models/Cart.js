const mongoose = require("mongoose");
const user = require("./User");
const option = require("./Option");
const Schema = mongoose.Schema;
const Cart = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    list: [
      {
        optionID: {
          type: Schema.Types.ObjectId,
          ref: "Option",
        },
        num: Number,
        color: String,
      },
    ],
  },
  { timestamps: true },
  { collection: "carts" }
);
module.exports = mongoose.model("Cart", Cart);
