const express = require('express');
const router = express.Router();
const purchase = require('../api/controllers/PurchaseController');
const {
  verifyTokenAdmin,
  verifyTokenAuth,
} = require('../middlewares/verificationHandler');

// @access PRIVATE
router.post('/repurchase', purchase.repurchase);
router.get('/delivered/:userID', verifyTokenAuth, purchase.delivered);
router.get('/delivering/:userID', verifyTokenAuth, purchase.delivering);
router.get('/all/:userID', purchase.all); //verifyTokenAuth,
router.get('/findOne/:userID/:productID', purchase.FindOne); //verifyTokenAuth,
router.put('/update/:userID/:productID', purchase.UpdateOne); //verifyTokenAuth,
router.delete('/:id', purchase.removeItem);
router.get('/emptylist', purchase.EmptyList);
router.get('/', purchase.index);
// @access ADMIN
router.get('/getallpurchase', verifyTokenAdmin, purchase.getAllPurchase);
router.get(
  '/getallpurchasebyyear',
  verifyTokenAdmin,
  purchase.getAllPurchaseByYear
);
router.get(
  '/getallpurchasebymonth',
  verifyTokenAdmin,
  purchase.getAllPurchaseByMonth
);
module.exports = router;
