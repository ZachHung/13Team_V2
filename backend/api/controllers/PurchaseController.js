const moment = require('moment');
const purchase = require('../models/Purchase');
const util = require('../../util/mongoose');
const cart = require('../models/Cart');
var ObjectId = require('mongodb').ObjectId;
var URL = 'http://localhost:3000/';

// const ID = useId; //userID của người dùng đã đăng nhập
const year = '2022';
const useId = '624a9edb4eb751d723d37e7f';
class PurchaseController {
  index(req, res, next) {
    res.render('purchase');
  }

  EmptyList(req, res, next) {
    purchase
      .deleteOne({
        userID: useId,
        list: { $size: 0 },
      })
      .then((data) => {
        res.json(data);
      });
  }

  all(req, res, next) {
    purchase
      .find({ userID: req.params.userID })

      .populate('userID', 'name')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })

      .then((data) => {
        data = util.mutipleMongooseToObject(data);

        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }
          var diff = Math.abs(new Date() - result.date);
          diff = diff / 60000;

          if (diff >= 0.5) {
            purchase
              .updateOne(
                {
                  userID: useId,
                  _id: result._id,
                },
                {
                  $set: { status: 'Đã giao hàng' },
                }
              )
              .then(() => {});
          }
        }
        res.json(data);
      });
  }
  delivered(req, res, next) {
    purchase
      .find({ userID: req.params.userID })

      .populate('userID', 'name')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .find({ status: 'Đã giao hàng' })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);

        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }
        }
        res.json(data);
      });
  }
  delivering(req, res, next) {
    purchase
      .find({ userID: req.params.userID })

      .populate('userID', 'name')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .find({ status: 'Đang giao hàng' })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);

        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }
        }

        res.json(data);
      });
  }
  checkout(req, res, next) {
    cart
      .find({ userID: useId })

      .then((data) => {
        var object = {
          optionID: req.query.optionID,
          num: req.query.num,
          color: req.query.color,
        };
        let count = 0;
        for (let item of data[0].list) {
          if (item.optionID.toString() == object.optionID.toString()) {
            cart
              .updateOne(
                {
                  userID: useId,
                  'list.optionID': object.optionID,
                },
                {
                  $inc: { 'list.$.num': object.num },
                }
              )
              .then((info) => {
                res.redirect('/cart');
              });
            break;
          }
          ++count;
        }
        if (count.toString() == data[0].list.length.toString()) {
          cart
            .updateOne(
              { userID: useId },
              {
                $push: { list: object },
              }
            )
            .then((info) => {
              res.redirect('/cart');
            });
        }
        // res.json(data)
      });
  }
  removeItem(req, res, next) {
    purchase
      .updateOne(
        { userID: useId },
        { $pull: { list: { optionID: req.params.id } } }
      )
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // admin zone
  getAllPurchase(req, res, next) {
    purchase
      .find()
      .populate('userID', 'name')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);
        // lọc ra những sản phẩm đã xóa, filter optionID = null
        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          // lọc ra đúng sp đã mua, vì trong option có nhiều sp,

          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }
        }
        res.json(data);
      })
      .catch(next);
  }
  // get all purchase by year
  getAllPurchaseByYear(req, res, next) {
    purchase
      .find()
      .populate('userID', 'name')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);
        const start_date_of_the_year = `${req.query.year}-01-01`;
        const end_date_of_the_year = `${req.query.year}-02-30`;
        // lọc ra những sản phẩm đã xóa, filter optionID = null
        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          // lọc ra đúng sp đã mua, vì trong option có nhiều sp,

          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }

          // get only year value
          console.log(
            'result.createdAt: ',
            result.createdAt,
            typeof result.createdAt
          );
          // example
          // "createdAt": "Sat Apr 02 2022 20:57:09 GMT+0700 (Indochina Time)",
          // "updatedAt": "2022-04-04T06:52:08.525Z"
          // result.createdAt = result.createdAt.toString().slice(11, 15);
        }
        //filter by year
        // data = data.filter((item) => item.createdAt == req.query.year);
        console.log(
          'start_date_of_the_year: ',
          start_date_of_the_year,
          'typeof: ',
          start_date_of_the_year
        );
        console.log('end_date_of_the_year: ', end_date_of_the_year);
        purchase
          .find({
            createdAt: {
              $gte: start_date_of_the_year,
              $lte: end_date_of_the_year,
            },
          })
          .then((item) => {
            res.json(item);
          });
        // res.json(data);
      })
      .catch(next);
  }
  getAllPurchaseByMonth(req, res, next) {
    purchase
      .find()
      .populate('userID', 'name')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);
        // lọc ra những sản phẩm đã xóa, filter optionID = null
        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          // lọc ra đúng sp đã mua, vì trong option có nhiều sp,

          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }

          // get only year value
          console.log(
            'result.createdAt: ',
            result.createdAt,
            typeof result.createdAt
          );
          // example
          // "createdAt": "Sat Apr 02 2022 20:57:09 GMT+0700 (Indochina Time)",
          // "updatedAt": "2022-04-04T06:52:08.525Z"
          result.createdAt = result.createdAt.toString().slice(4, 7);
        }
        //filter by month
        const start_date_of_the_year = moment(year);
        const end_date_of_the_year = moment(year).endOf('year');
        console.log(
          'start_date_of_the_year: ',
          start_date_of_the_year,
          'typeof: ',
          start_date_of_the_year
        );
        console.log('end_date_of_the_year: ', end_date_of_the_year);
        data = data.filter((item) => item.createdAt == req.query.month);
        res.json(data);
      })
      .catch(next);
  }

  getPurchasesAdmin(req, res, next) {
    purchase
    .find()
    .populate('userID')
    .populate('list.optionID')
    .populate({
      path: 'list.optionID',
      populate: {
        path: 'item',
        select: 'name type brand',
      },
    })
    .then((data) => {
      data = util.mutipleMongooseToObject(data);

      for (let result of data) {
        result.list = result.list.filter((list) => {
          return list.optionID !== null;
        });
        for (let item of result.list) {
          item.optionID.color = item.optionID.color.filter((color) => {
            return color.name === item.color;
          });
        } 
      }
      res.json({
        purchase: data,
      });
    })
    .catch(next);
  }

  async deletePurchasesAdmin(req, res, next) {
    const purchaseId = req.params.id;
    const purchaseDelete = await purchase.findOne({
      _id: ObjectId(purchaseId),
    });
    if (purchaseDelete) {
      try {
        const deletePurchase = await purchaseDelete.deleteOne({
          _id: ObjectId(purchaseId),
        });
      } catch (e) {
        console.error(`[Error] ${e}`);
        throw Error('Có lỗi xảy ra, vui lòng thử lại!!');
      }
    }
  }

  deleteManyPurchasesAdmin(req, res, next){
    const ids = req.body;
     purchase.deleteMany({_id: {$in: ids}})
     .then (() => res.redirect(URL + 'admin/orders'))
     .catch(next);
  }
  
  detailPurchasesAdmin(req, res, next) {
    purchase
      .find({ _id: ObjectId(req.params.id) })
      .populate('userID')
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);

        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }
        }

        res.json({
          purchase: data,
        });
      })
      .catch(next);
  }

  edit(req, res, next) {

    purchase
      .find({ _id: ObjectId(req.params.id) })
      .populate('list.optionID')
      .populate({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .then((data) => {
        data = util.mutipleMongooseToObject(data);

        for (let result of data) {
          result.list = result.list.filter((list) => {
            return list.optionID !== null;
          });
          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter((color) => {
              return color.name === item.color;
            });
          }
        }

        res.json({
          purchase: data,
        });
      })
      .catch(next);
  }

  updatePurchase(req, res, next) {
    purchase
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect(URL + 'admin/orders'))
      .catch(next);
  }
}
module.exports = new PurchaseController();
