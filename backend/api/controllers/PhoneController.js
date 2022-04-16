const items = require('../models/Item');
const ObjectID = require('mongodb').ObjectID;
const cart = require('../models/Cart');

class PhoneController {
  compare(req, res, next) {
    const productsCompare = req.query.product;
    var arrayProductsCompare;
    if (productsCompare == undefined) {
      productsCompare = '';
    }
    arrayProductsCompare = productsCompare.split(',');
    console.log(
      'arrayProductsCompare',
      arrayProductsCompare,
      typeof arrayProductsCompare
    );
    if (productsCompare != '') {
      items
        .aggregate([
          {
            $match: {
              $or: [
                { _id: ObjectID(arrayProductsCompare[0]) },
                { _id: ObjectID(arrayProductsCompare[1]) },
                { _id: ObjectID(arrayProductsCompare[2]) },
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
          res.json(items);
        })
        .catch(next);
    }
  }
  brand(req, res, next) {
    var fullUrl = req.originalUrl;
    // console.log('fullUrl ', fullUrl);
    const urlArray = fullUrl.split('/');
    // console.log('split: ', urlArray[2]);
    const typeProduct = urlArray[2];
    console.log('type product brand: ', typeProduct);
    items
      .find({ type: typeProduct })
      .distinct('brand')

      .then((items) => {
        res.json(items);
      })
      .catch(next);
  }
  brandName(req, res, next) {
    var fullUrl = req.originalUrl;
    // console.log('fullUrl ', fullUrl);
    const urlArray = fullUrl.split('/');
    // console.log('split: ', urlArray[2]);
    const typeProduct = urlArray[2];
    console.log('type product brandName: ', typeProduct);

    items
      .find({ type: typeProduct })
      .distinct('brand.name')

      .then((items) => {
        res.json(items);
      })
      .catch(next);
  }
  home(req, res, next) {
    //define type of product
    var fullUrl = req.originalUrl;
    console.log('fullUrl ', fullUrl);
    const urlArray = fullUrl.split('/');
    console.log('split: ', urlArray[2]);
    // const typeProduct = urlArray[2];
    const splitTypeProduct = urlArray[2].split('?');
    const typeProduct = splitTypeProduct[0];
    console.log('typeProduct: ', typeProduct);
    //get query params
    var paramBrand = req.query.brand;
    var paramPrice = req.query.price;
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
              type: typeProduct,
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
                    'brand.name': { $in: arrayBrand },
                  },
                  {
                    type: typeProduct,
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
                type: typeProduct,
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
                    type: typeProduct,
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
}
module.exports = new PhoneController();
