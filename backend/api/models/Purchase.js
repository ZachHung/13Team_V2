const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Purchase = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    list: [
      {
        optionID: {
          type: Schema.Types.ObjectId,
          ref: 'Option',
        },
        quantity: { type: Number },
        color: String,
        deleted: { type: Boolean, default: false },
      },
    ],
    status: { type: String, default: 'Đang giao hàng' },
  },
  { timestamps: true },
  { collection: 'purchases' }
);
module.exports = mongoose.model('Purchase', Purchase);
