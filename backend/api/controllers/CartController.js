const cart = require("../models/Cart");
const purchase = require("../models/Purchase");
const options = require("../models/Option");
const CryptoJS = require("crypto-js");
const moment = require("moment");
require("dotenv").config();

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
    cart
      .updateOne(
        {
          userID: req.params.userID,
        },
        {
          $pull: {
            list: {
              optionID: req.body.optionID,
              color: req.body.color,
            },
          },
        }
      )
      .then((data) =>
        data.modifiedCount
          ? res.status(200).json("Removed item successful")
          : res.status(200).json("Nothing was changed")
      )
      .catch((err) => res.status(500).json(err));
  }

  //POST /cart/purchase
  purchaseCart(req, res, next) {
    cart
      .findOneAndUpdate({ userID: req.params.userID }, { $set: { list: [] } })
      .then((data) => {
        data = data.toObject();
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

  // @desc create vnPay payment url
  // @ POST /cart/:userID/create_payment_url
  vnPay_createPayment(req, res, next) {
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var tmnCode = process.env.vnp_TmnCode;
    var secretKey = process.env.vnp_HashSecret;
    var vnpUrl = process.env.vnp_Url;
    var returnUrl = process.env.vnp_ReturnUrl;

    var date = new Date();

    var createDate = moment(date).format("YYYYMMDDHHmmss");
    var orderId = moment(date).format("HHmmss");
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (!locale) locale = "vn";
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode) vnp_Params["vnp_BankCode"] = bankCode;

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
      CryptoJS.enc.Hex
    );
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.json(vnpUrl);
  }

  vnPay_returnUrl(req, res, next) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.vnp_HashSecret;

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
      CryptoJS.enc.Hex
    );

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      res
        .status(200)
        .json({ message: "Success", code: vnp_Params["vnp_ResponseCode"] });
    } else {
      res.status(200).json({ message: "Fail checksum", code: "97" });
    }
  }

  vnPay_ipn(req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = process.env.vnp_HashSecret;
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var signed = CryptoJS.HmacSHA512(signData, secretKey).toString(
      CryptoJS.enc.Hex
    );

    if (secureHash === signed) {
      var orderId = vnp_Params["vnp_TxnRef"];
      var rspCode = vnp_Params["vnp_ResponseCode"];
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      res.status(200).json({ RspCode: "00", Message: "success" });
    } else {
      res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
    }
  }
}
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
module.exports = new CheckoutController();
