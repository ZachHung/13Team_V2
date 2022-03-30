const cart = require("../models/Cart");
const purchase = require("../models/Purchase");
var ID = "624338b03a6839390c6a00f4";
class CheckoutController {
  // Add item to cart
  // POST /cart/add
  addCart(req, res, next) {
    cart
      .find({
        userID: ID,
        "list.optionID": req.body.optionID,
      })
      .then((data) => {
        if (data.length === 0) {
          var item = {
            optionID: req.body.optionID,
            color: req.body.color,
          };
          cart
            .updateOne({ userID: ID }, { $push: { list: item } })
            .then((data) => {
              res.json("Added to cart successful");
            })
            .catch((err) => {
              res.json("Added to cart failed");
            });
        } else {
          data = data.map((data) => data.toObject());
          var lists = data[0].list;
          lists.forEach((item) => {
            if (
              item.optionID == req.body.optionID &&
              item.color == req.body.color
            ) {
              item.quantity = item.quantity + 1;
            }
          });
          cart
            .updateOne(
              {
                userID: ID,
              },
              {
                list: lists,
              }
            )
            .then((data) => {
              res.status(200).json("Added to cart successful");
            })
            .catch((err) => {
              res.status(500).json("Added to cart failed");
            });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  // Get cart of login user
  //GET /cart
  getCart(req, res, next) {
    cart
      .findOne({ userID: "623e6456532a339f852a26bf" })
      .populate("list.optionID", "detail color.name color.image color.price")
      .populate({
        path: "list.optionID",
        populate: {
          path: "item",
          select: "name type",
        },
      })
      .then((data) => {
        data = data.toObject();
        let total = 0;
        // hoa add
        data.list = data.list.filter((list) => {
          return list.optionID !== null;
        });
        //
        for (let item of data.list) {
          item.optionID.color = item.optionID.color.filter((color) => {
            return color.name === item.color;
          });
          total += item.optionID.color[0].price * item.quantity;
        }
        res.status(200).json({
          ...data,
          total: total,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  // @desc Update items in user's Cart
  // @route PUT /cart/:optionID
  // @queries:
  // @  quantity: update quantity
  updateItem(req, res, next) {
    let update = {};
    const quantity = req.body.quantity;
    const color = req.body.color;
    let payload = {
      quantity,
      color,
    };
    payload.quantity &&
      (update.$set = { "list.$.quantity": req.query.quantity });
    cart
      .findOne({
        userID: ID,
      })
      .populate("list.optionID", "detail color.name color.image color.price")
      .populate({
        path: "list.optionID",
        populate: {
          path: "item",
          select: "name type",
        },
      })
      .then((data) => {
        let list = data.list.filter(
          (item) => item.optionID._id === req.params.optionID
        );
        res.json(list);
      });
    // cart
    //   .updateOne(
    //     {
    //       userID: ID,
    //       "list.optionID": req.params.optionID,
    //     },
    //     update
    //   )
    //   .then((updatedCart) => {
    //     return (data = updatedCart);
    //   })
    //   .catch((err) => {
    //     res.status(500).json(err);
    //   });
  }

  // @desc Delete item in cart
  // @route DELETE /cart/:optionID
  removeItem(req, res, next) {
    cart
      .updateOne(
        {
          userID: ID,
        },
        { $pull: { list: { optionID: req.params.optionID } } }
      )
      .then(() => res.status(500).json("Cart items has been deleted"))
      .catch((err) => res.status(500).json(err));
  }

  //POST /cart/purchase
  purchaseCart(req, res, next) {
    cart
      .findOneAndUpdate({ userID: ID }, { $set: { list: [] } })
      .then((data) => {
        delete data._id;
        const p = new purchase(data);
        p.save();
        res.status(200).json("Purchased successful");
      })
      .catch((err) => res.status(500).json(err));
  }

  // @desc Get ANY user cart
  // @route GET /cart/find/:userID
  getAnyCart(req, res, next) {
    cart
      .findOne({ userID: req.params.userID })

      .populate("list.optionID", "detail color.name color.image color.price")
      .populate({
        path: "list.optionID",
        populate: {
          path: "item",
          select: "name type",
        },
      })
      .then((data) => {
        data = data.toObject();
        let total = 0;
        // hoa add
        data.list = data.list.filter((list) => {
          return list.optionID !== null;
        });
        //
        for (let item of data.list) {
          item.optionID.color = item.optionID.color.filter((color) => {
            return color.name === item.color;
          });
          total += item.optionID.color[0].price * item.quantity;
        }
        res.status(200).json({
          ...data,
          total: total,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  // @desc Get ALL user cart
  // @route GET /cart/find
  getAllCart(req, res, next) {
    cart
      .find()
      .populate("list.optionID", "detail color.name color.image color.price")
      .populate({
        path: "list.optionID",
        populate: {
          path: "item",
          select: "name type",
        },
      })
      .then((data) => {
        data = data.map((data) => data.toObject());
        data = data.filter((cart) => cart.list.length > 0);
        for (let cart of data) {
          cart.list = cart.list.filter((list) => {
            return list.optionID !== null;
          });
          let total = 0;
          for (let item of cart.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
            total += item.optionID.color[0].price * item.quantity;
          }
          cart.total = total;
        }
        res.status(200).json({
          ...data,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = new CheckoutController();
