const express = require('express');
const router = express.Router();
const itemController = require('../api/controllers/ItemController');
const phoneController = require('../api/controllers/PhoneController');

router.post('/addcart', phoneController.addCart);
router.post('/checkout', phoneController.checkout);
router.get('/totalproduct', phoneController.totalproduct);
router.get('/info', phoneController.info);
router.get('/brand', phoneController.brand);
router.get('/:slug', itemController.detailItem);
router.get('/', phoneController.index);
module.exports = router;
