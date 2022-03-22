const cart = require("../models/Cart");
const util = require("../../util/mongoose");
const purchase = require("../models/Purchase");
var ID = ""; //userID of logged-in user
class CheckoutController {
  //GET /checkout
  index(req, res, next) {
    cart
      .find({ userID: req.session.user._id })
      .populate("userID", "email address phone name")
      .populate("list.optionID", "detail color.name color.image color.price")
      .populate({
        path: "list.optionID",
        populate: {
          path: "item",
          select: "name type",
        },
      })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);
        let result = data[0];
        let subTotal = 0;
        // hoa add
        for (let object of data) {
          object.list = object.list.filter((list) => {
            return list.optionID !== null;
          });
        }
        //
        for (let item of result.list) {
          item.optionID.color = item.optionID.color.filter((color) => {
            return color.name === item.color;
          });

          subTotal += item.optionID.color[0].price * item.num;
        }
        // res.json(result);
        // result.userID.address = result.userID.address.split(", ").reverse();
        // render màn hình
        res.json({
          itemList: result.list,
          emptyCart: !result.list.length,
          userInfo: result.userID,
          subTotal: subTotal,
          total: subTotal + 30000,
        });
      })
      .catch(next);
  }

  //PUT /checkout/set-quantity
  setQuantity(req, res, next) {
    cart
      .updateOne(
        {
          userID: req.session.user._id,
          "list.optionID": req.body.itemID,
        },
        { $set: { "list.$.num": req.body.value } }
      )
      .then(() => res.jsonStatus(200))
      .catch(next);
  }

  //DELETE /checkout/:id
  removeItem(req, res, next) {
    cart
      .updateOne(
        {
          userID: req.session.user._id,
        },
        { $pull: { list: { optionID: req.params.id } } }
      )
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //POST /checkout/purchase
  purchaseCart(req, res, next) {
    cart
      .findOneAndUpdate(
        { userID: req.session.user._id },
        { $set: { list: [] } }
      )
      .then((data) => {
        data = util.mongooseToObject(data);
        delete data._id;

        const p = new purchase(data);
        p.save();
      })
      .catch(next);
  }
}
module.exports = new CheckoutController();
