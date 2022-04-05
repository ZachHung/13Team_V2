const express = require('express');
const router = express.Router();
const purchase = require('../api/controllers/PurchaseController');
const {
  verifyTokenAdmin,
  verifyTokenAuth,
} = require('../middlewares/verificationHandler');

// @access PRIVATE
router.post('/repurchase', purchase.checkout);
router.get('/delivered/:userID', verifyTokenAuth, purchase.delivered);
router.get('/delivering/:userID', verifyTokenAuth, purchase.delivering);
router.get('/all/:userID', verifyTokenAuth, purchase.all);
router.delete('/:id', purchase.removeItem);
router.get('/emptylist', purchase.EmptyList);
router.get('/', purchase.index);

module.exports = router;
