const purchase = require('../models/Purchase');
const util = require('../../util/mongoose');
const items = require('../models/Item');

class SearchController {
  //search global
  index(req, res, next) {
    var paramBrand = req.query.brand;
    var paramPrice = req.query.price;
    var keyword = req.query.key;
    var arrayBrand;
    if (paramBrand == undefined) {
      paramBrand = '';
    }
    arrayBrand = paramBrand.split(',');
    let to2 = 0;
    let from2 = -1;
    let to5 = 0;
    let from5 = -1;
    let to14 = 0;
    let from14 = 100000000000;

    if (paramPrice == undefined) {
      paramPrice = '';
    }
    if (paramPrice == '' && paramBrand == '') {
      items
        .aggregate([
          {
            $match: {
              name: { $regex: keyword, $options: 'i' },
            },
          },
          {
            $lookup: {
              from: 'options',
              localField: 'slug',
              foreignField: 'slug',
              as: 'slug',
            },
          },
        ])
        .then((items) => {
          res.json({ items: items });
        })
        .catch(next);
    } else {
      if (paramBrand != '' && paramPrice == '') {
        items
          .aggregate([
            {
              $match: {
                $and: [
                  {
                    name: { $regex: keyword, $options: 'i' },
                  },
                  {
                    'brand.name': { $in: arrayBrand },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: 'options',
                localField: 'slug',
                foreignField: 'slug',
                as: 'slug',
              },
            },
          ])
          .then((items) => {
            res.json({
              items: items,
            });
          })
          .catch(next);
      }
      if (paramBrand == '' && paramPrice != '') {
        if (paramPrice.search('duoi-2-trieu') >= 0) {
          to2 = 2000000;
        }
        if (paramPrice.search('tu-2-5-trieu') >= 0) {
          from2 = 2000000;
          to5 = 5000000;
        }
        if (paramPrice.search('tu-5-14-trieu') >= 0) {
          from5 = 5000000;
          to14 = 14000000;
        }
        if (paramPrice.search('tren-14-trieu') >= 0) {
          from14 = 14000000;
        }
        items
          .aggregate([
            {
              $match: {
                name: { $regex: keyword, $options: 'i' },
              },
            },
            {
              $lookup: {
                from: 'options',
                localField: 'slug',
                foreignField: 'slug',
                as: 'slug',
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
          .then((items) => {
            res.json({
              items: items,
            });
          })
          .catch(next);
      }

      if (paramBrand != '' && paramPrice != '') {
        if (paramPrice.search('duoi-2-trieu') >= 0) {
          to2 = 2000000;
        }
        if (paramPrice.search('tu-2-5-trieu') >= 0) {
          from2 = 2000000;
          to5 = 5000000;
        }
        if (paramPrice.search('tu-5-14-trieu') >= 0) {
          from5 = 5000000;
          to14 = 14000000;
        }
        if (paramPrice.search('tren-14-trieu') >= 0) {
          from14 = 14000000;
        }
        items
          .aggregate([
            {
              $match: {
                $and: [
                  {
                    'brand.name': { $in: arrayBrand },
                  },
                  {
                    name: { $regex: keyword, $options: 'i' },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: 'options',
                localField: 'slug',
                foreignField: 'slug',
                as: 'slug',
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
          .then((items) => {
            res.json({
              items: items,
            });
          })
          .catch(next);
      }
    }
  }
  global(req, res, next) {
    var keyword = req.query.key;
    var sort = req.query.sort;
    var temp;
    if (sort != undefined) {
      if (sort == 'asc') {
        temp = 1;
      } else {
        temp = -1;
      }
    }
    if (keyword == undefined) {
      items
        .aggregate([
          {
            $lookup: {
              from: 'options',
              localField: 'slug',
              foreignField: 'slug',
              as: 'slug',
            },
          },
        ])
        .then((items) => {
          res.json({ items: items });
        });
    } else {
      items
        .aggregate([
          {
            $match: {
              name: { $regex: keyword, $options: 'i' },
            },
          },
          {
            $lookup: {
              from: 'options',
              localField: 'slug',
              foreignField: 'slug',
              as: 'slug',
            },
          },
        ])
        .sort({
          'slug.color.price': temp,
        })
        .then((items) => {
          res.json({
            items: items,
          });
          // res.json(items)
        })

        .catch(next);
    }
  }
  brand(req, res, next) {
    items
      .distinct('brand')
      .then((items) => {
        res.json(items);
      })
      .catch(next);
  }
  brandName(req, res, next) {
    items
      .distinct('brand.name')
      .then((items) => {
        res.json(items);
      })
      .catch(next);
  }
  match(req, res, next) {
    var keyword = req.query.key;

    items
      .aggregate([
        {
          $match: {
            name: { $regex: keyword, $options: 'i' },
          },
        },
        {
          $lookup: {
            from: 'options',
            localField: 'slug',
            foreignField: 'slug',
            as: 'slug',
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
            name: { $regex: keyword, $options: 'i' },
          },
        },
        {
          $lookup: {
            from: 'options',
            localField: 'slug',
            foreignField: 'slug',
            as: 'slug',
          },
        },
      ])

      .then((items) => {
        res.json(items);
      })

      .catch(next);
  }
  // search for purchase
  purchaseSearch(req, res, next) {
    var queryParam = req.query.purchase;

    purchase
      .find({ userID: req.session.user._id })

      .populate('userID', 'name')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
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
