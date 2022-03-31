const items = require("../models/Item");
const cart = require("../models/Cart");

class AccessoryController {
  addCart(req, res, next) {
    items
      .aggregate([
        {
          $match: {
            $and: [
              {
                _id: req.query.itemID,
              },
              {
                type: "accessory",
              },
            ],
          },
        },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "slug",
          },
        },
        {
          $project: {
            "slug._id": 1,
            _id: 1,
            "slug.color": 1,
          },
        },
      ])

      .then((items) => {
        // items = mongoose.mutipleMongooseToObject(items);
        var object = {
          optionID: items[0].slug[0]._id,
          num: 1,
          color: items[0].slug[0].color[0].name,
        };
        cart
          .find({ userID: req.session.user._id })

          .then((data) => {
            let count = 0;
            for (let item of data[0].list) {
              if (item.optionID.toString() == object.optionID.toString()) {
                cart
                  .updateOne(
                    {
                      userID: req.session.user._id,
                      "list.optionID": object.optionID,
                    },
                    {
                      $inc: { "list.$.num": 1 },
                    }
                  )
                  .then((info) => {
                    res.redirect("back");
                  });
                break;
              }
              ++count;
            }
            if (count.toString() == data[0].list.length.toString()) {
              cart
                .updateOne(
                  { userID: req.session.user._id },
                  {
                    $push: { list: object },
                  }
                )
                .then((info) => {
                  res.redirect("back");
                });
            }
          });

        //	res.json(object)
      })

      .catch(next);
  }
  checkout(req, res, next) {
    items
      .aggregate([
        {
          $match: {
            $and: [
              {
                _id: req.query.itemID,
              },
              {
                type: "accessory",
              },
            ],
          },
        },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "slug",
          },
        },
        {
          $project: {
            "slug._id": 1,
            _id: 1,
            "slug.color": 1,
          },
        },
      ])

      .then((items) => {
        // items = mongoose.mutipleMongooseToObject(items);
        var object = {
          optionID: items[0].slug[0]._id,
          num: 1,
          color: items[0].slug[0].color[0].name,
        };
        cart
          .find({ userID: req.session.user._id })

          .then((data) => {
            let count = 0;
            for (let item of data[0].list) {
              if (item.optionID.toString() == object.optionID.toString()) {
                cart
                  .updateOne(
                    {
                      userID: req.session.user._id,
                      "list.optionID": object.optionID,
                    },
                    {
                      $inc: { "list.$.num": 1 },
                    }
                  )
                  .then((info) => {
                    res.redirect("/cart");
                  });
                break;
              }
              ++count;
            }
            if (count.toString() == data[0].list.length.toString()) {
              cart
                .updateOne(
                  { userID: req.session.user._id },
                  {
                    $push: { list: object },
                  }
                )
                .then((info) => {
                  res.redirect("/cart");
                });
            }
          });

        //	res.json(object)
      })

      .catch(next);

    // res.json("i love u")
  }

  info(req, res, next) {
    items
      .aggregate([
        {
          $match: {
            type: "accessory",
          },
        },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "slug",
          },
        },
      ])

      .then((items) => {
        res.json(items);
      })

      .catch(next);
  }
  totalproduct(req, res, next) {
    items
      .aggregate([
        {
          $match: {
            type: "accessory",
          },
        },
        {
          $lookup: {
            from: "options",
            localField: "slug",
            foreignField: "slug",
            as: "slug",
          },
        },
      ])

      .then((items) => {
        res.json(items.length.toString());
      })

      .catch(next);
  }
  index(req, res, next) {
    let perPage = 9;
    let page = req.query.page || 1;
    let paramBrand = req.query.brand;
    let paramPrice = req.query.price;
    var sort = req.query.sort;
    var temp;
    if (sort != undefined) {
      if (sort == "asc") {
        temp = 1;
      } else {
        temp = -1;
      }
    }
    let to2 = 0;
    let from2 = -1;
    let to5 = 0;
    let from5 = -1;
    let to14 = 0;
    let from14 = 100000000000;

    if (paramBrand == undefined) {
      paramBrand = "";
    }
    if (paramPrice == undefined) {
      paramPrice = "";
    }

    if (paramBrand != "" || paramPrice != "") {
      if (paramPrice == "") {
        paramPrice = 0;
      } else {
        if (paramPrice.search("duoi-2-tram") >= 0) {
          to2 = 200000;
        }
        if (paramPrice.search("tu-2-5-tram") >= 0) {
          from2 = 200000;
          to5 = 500000;
        }
        if (paramPrice.search("tu-5-1-trieu") >= 0) {
          from5 = 500000;
          to14 = 1000000;
        }
        if (paramPrice.search("tren-1-trieu") >= 0) {
          from14 = 1000000;
        }
      }

      //

      //  paramPrice = parseFloat(paramPrice)
      let strParam = paramBrand.split(",");
      // strParam = strParam.StringSplitOptions.RemoveEmptyEntries;
      let brand1 = strParam[0];
      let brand2 = strParam[1];
      // let brand3 = strParam[2];
      // let brand4 = strParam[3];
      // let brand5 = strParam[4];
      // let brand6 = strParam[5];
      if (paramBrand == "" && paramPrice != "") {
        brand1 = "jbl";
        brand2 = "remax";
        // brand3 = "asus";
        // brand4 = "oppo";
        // brand5 = "xiaomi";
        // brand6 = "realme";
      } // for paramPrice still work when paramBrand is empty

      items
        .aggregate([
          {
            $match: {
              $and: [
                {
                  $or: [
                    {
                      brand: brand1,
                    },
                    {
                      brand: brand2,
                    },
                    // {
                    //     brand: brand3,
                    // },
                    // {
                    //     brand: brand4,
                    // },
                    // {
                    //     brand: brand5,
                    // },
                    // {
                    //     brand: brand6,
                    // },
                  ],
                },
                {
                  type: "accessory",
                },
              ],
            },
          },

          {
            $lookup: {
              from: "options",
              localField: "slug",
              foreignField: "slug",
              // pipeline: [{ $match: { detail: "256GB" } }],
              as: "slug",
            },
          },

          {
            $match: {
              $or: [
                {
                  slug: {
                    $elemMatch: {
                      color: { $elemMatch: { price: { $gte: paramPrice } } },
                    },
                  },
                },
                {
                  slug: {
                    $elemMatch: {
                      color: { $elemMatch: { price: { $lt: to2 } } },
                    },
                  },
                },

                {
                  slug: {
                    $elemMatch: {
                      color: {
                        $elemMatch: {
                          price: { $elemMatch: { $gte: from2, $lt: to5 } },
                        },
                      },
                    },
                  },
                },

                {
                  slug: {
                    $elemMatch: {
                      color: {
                        $elemMatch: { price: { $gte: from5, $lt: to14 } },
                      },
                    },
                  },
                },

                {
                  slug: {
                    $elemMatch: {
                      color: { $elemMatch: { price: { $gte: from14 } } },
                    },
                  },
                },
              ],
            },
          },
        ])
        .sort({
          "slug.color.price": temp,
        })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then((items) => {
          res.json({
            items: items,
          });
          // res.json(items)
        })

        .catch(next);
    } else {
      items
        .aggregate([
          {
            $match: {
              type: "accessory",
            },
          },
          {
            $lookup: {
              from: "options",
              localField: "slug",
              foreignField: "slug",
              as: "slug",
            },
          },
        ])
        .sort({
          "slug.color.price": temp,
        })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then((items) => {
          res.json({
            items: items,
          });
          // res.json(items)
        })

        .catch(next);
    }
  }
}
module.exports = new AccessoryController();
