const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Purchase = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
    },
    list: [
      {
        optionID: {
          type: Schema.Types.ObjectId,
          ref: "Option",
        },
        quantity: { type: Number },
        color: String,
      },
    ],
    status: { type: String, default: "Đang giao" },
  },
  { timestamps: true },
  { collection: "purchases" }
);
module.exports = mongoose.model("Purchase", Purchase);
