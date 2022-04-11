const purchase = require('../models/Purchase');
const util = require('../../util/mongoose');
const cart = require('../models/Cart');
var ObjectId = require ('mongodb').ObjectId;
var URL = "http://localhost:3000/"

// const ID = useId; //userID của người dùng đã đăng nhập
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
                  $set: { status: 'Đã giao' },
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
      .find({ status: 'Đã giao' })
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
      .find({ status: 'Đang giao' })
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
  async getPurchasesAdmin (req, res, next) {
    const purchasesPerPage = await purchase.countDocuments ({});
    let page = req.query.page ? parseInt (req.query.page) : 1;
    purchase
      .find ({})
      .skip (purchasesPerPage * (page - 1))
      .limit (purchasesPerPage)
      .then (purchases => {
        res.json ({
          purchase: purchases,
        });
      })
      .catch (next);
  }

  async deletePurchasesAdmin (req, res, next) {
    const purchaseId = req.params.id;

    const purchaseDelete = await purchase.findOne ({
      _id: ObjectId (purchaseId),
    });
    if (purchaseDelete) {
      try {
        const deletePurchase = await purchaseDelete.deleteOne ({
          _id: ObjectId (purchaseId),
        });
      } catch (e) {
        console.error (`[Error] ${e}`);
        throw Error ('Có lỗi xảy ra, vui lòng thử lại!!');
      }
    }
  }

  detailPurchasesAdmin (req, res, next) {
    purchase.find ({_id: ObjectId(req.params.id)})
      .populate ('list.optionID')
      .populate ({
        path: 'list.optionID',
        populate: {
          path: 'item',
          select: 'name type brand',
        },
      })
      .then (data => {
        data = util.mutipleMongooseToObject (data);

        for (let result of data) {
          result.list = result.list.filter (list => {
            return list.optionID !== null;
          });
          for (let item of result.list) {
            item.optionID.color = item.optionID.color.filter (color => {
              return color.name === item.color;
            });
          }
        }
       
        res.json ({
          purchase: data,
        });
      })
      .catch (next);
      console.log(purchase);  
  }

  edit(req, res, next) {
    purchase.findById(req.params.id)
      .then(purchase => res.json({ purchase: purchase }))
      .catch(next)
  }

  updatePurchase(req, res, next) {
    purchase.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect(URL + 'admin/orders/update/' + req.params.id))
      .catch(next)
  }
}
module.exports = new PurchaseController();
