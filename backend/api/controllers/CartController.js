const cart = require("../models/Cart");
const purchase = require("../models/Purchase");
const options = require("../models/Option");
class CheckoutController {
  // @desc Add item to cart
  // @route POST /cart/add/:userID
  // @body:
  // @  optionID: optionID of item
  // @  color: color of that option
  addCart(req, res, next) {
    const color = req.body.color;
    options
      .findById(req.body.optionID)
      .then((dataOption) => {
        if (!dataOption) res.status(500).json("That optionID does not exist");
        else {
          cart
            .findOne({
              userID: req.params.userID,
            })
            .populate(
              "list.optionID",
              "detail color.name color.image color.price"
            )
            .then((dataCart) => {
              dataCart = dataCart.toObject();
              dataOption = dataOption.toObject();
              let colors = dataOption.color.map((color) => color.name);
              if (colors.includes(color)) {
                let singleItem = dataCart.list.filter(
                  (item) =>
                    item.optionID._id == req.body.optionID &&
                    item.color == color
                );
                if (singleItem.length) {
                  cart
                    .updateOne(
                      {
                        userID: req.params.userID,
                        list: {
                          $elemMatch: {
                            optionID: req.body.optionID,
                            color: color,
                          },
                        },
                      },
                      { $inc: { "list.$.quantity": 1 } }
                    )
                    .then(() =>
                      res.status(200).json("Added to cart successful")
                    )
                    .catch((err) => res.status(500).json(err));
                } else {
                  cart
                    .updateOne(
                      { userID: req.params.userID },
                      {
                        $push: {
                          list: {
                            optionID: req.body.optionID,
                            quantity: 1,
                            color: color,
                          },
                        },
                      }
                    )
                    .then(() =>
                      res.status(200).json("Added to cart successful")
                    )
                    .catch((err) => res.status(500).json(err));
                }
              } else res.status(500).json("That color doesn't exist");
            })
            .catch((err) => res.status(500).json(err));
        }
      })
      .catch((err) => res.status(500).json(err));
  }

  // @desc Get cart of login user
  // @route GET /cart/:userID
  getCart(req, res, next) {
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

  // @desc Update items in user's Cart
  // @route PUT /cart/:userID
  // @body:
  // @  optionID: optionID of item
  // @  color: color of item
  // @  quantity: quantity to change to
  updateItem(req, res, next) {
    const quantity = req.body.quantity;
    const color = req.body.color;
    if (quantity <= 0) res.status(500).json("Invalid quantity");
    else
      cart
        .updateOne(
          {
            userID: req.params.userID,
            list: {
              $elemMatch: {
                optionID: req.body.optionID,
                color: color,
              },
            },
          },
          {
            $set: { "list.$.quantity": quantity },
          }
        )
        .then((data) =>
          data.modifiedCount
            ? res.status(200).json("Updated item successful")
            : res.status(200).json("Nothing was change")
        )
        .catch((err) => res.status(500).json(err));
  }

  // @desc Delete item in cart
  // @route DELETE /cart/:userID
  // @body
  // @  optionID: optionID of item
  // @  color: color of item
  removeItem(req, res, next) {
    const color = req.body.color;
    cart
      .updateOne(
        {
          userID: req.params.userID,
        },
        {
          $pull: {
            list: {
              optionID: req.body.optionID,
              color: color,
            },
          },
        }
      )
      .then((data) =>
        data.modifiedCount
          ? res.status(200).json("Removed item successful")
          : res.status(200).json("Nothing was change")
      )
      .catch((err) => res.status(500).json(err));
  }

  //POST /cart/purchase
  purchaseCart(req, res, next) {
    cart
      .findOneAndUpdate({ userID: req.params.userID }, { $set: { list: [] } })
      .then((data) => {
        data = data.toObject();
        res.json(data);
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
