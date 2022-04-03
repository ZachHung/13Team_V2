const express = require('express');
const router = express.Router();
const itemController = require('../api/controllers/ItemController');
const phoneController = require('../api/controllers/PhoneController');

router.post('/addcart', phoneController.addCart);
router.post('/cart', phoneController.checkout);
router.get('/totalproduct', phoneController.totalproduct);
router.get('/info', phoneController.info);
router.get('/brand', phoneController.brand);
router.get('/brand/name', phoneController.brandName);
router.get('/:slug', itemController.detailItem);
router.get('/', phoneController.home);
module.exports = router;
