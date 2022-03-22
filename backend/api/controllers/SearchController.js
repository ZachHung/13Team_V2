const purchase = require("../models/Purchase");
const util = require("../../util/mongoose");
const items = require("../models/Item");

class SearchController {
  //search global
  global(req, res, next) {
    var keyword = req.query.key;
    var sort = req.query.sort;
    var temp;
    if (sort != undefined) {
      if (sort == "asc") {
        temp = 1;
      } else {
        temp = -1;
      }
    }

    items
      .aggregate([
        {
          $match: {
            name: { $regex: keyword, $options: "i" },
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
      .then((items) => {
        res.json({
          items: items,
        });
        // res.json(items)
      })

      .catch(next);
  }
  match(req, res, next) {
    var keyword = req.query.key;

    items
      .aggregate([
        {
          $match: {
            name: { $regex: keyword, $options: "i" },
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

  info(req, res, next) {
    var keyword = req.query.key;

    items
      .aggregate([
        {
          $match: {
            name: { $regex: keyword, $options: "i" },
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
  // search for purchase
  index(req, res, next) {
    var queryParam = req.query.purchase;

    purchase
      .find({ userID: req.session.user._id })

      .populate("userID", "name")
      .populate("list.optionID")
      .populate({
        path: "list.optionID",
        populate: {
          path: "item",
          select: "name type brand",
          match: { name: { $regex: queryParam } },
        },
      })
      .then((data) => {
        // data = util.mutipleMongooseToObject(data);
        data = util.mutipleMongooseToObject(data);
        let result = data[0];
        for (let object of data) {
          object.list = object.list.filter((list) => {
            return list.optionID !== null;
          });
        }
        for (let object of data) {
          object.list = object.list.filter((list) => {
            return list.optionID.item !== null;
          });
        }
        for (let item of result.list) {
          item.optionID.color = item.optionID.color.filter((color) => {
            return color.name === item.color;
          });
        }
        res.json(data);
      });
  }
}
module.exports = new SearchController();
