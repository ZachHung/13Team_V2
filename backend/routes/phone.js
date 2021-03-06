const express = require('express');
const router = express.Router();
const itemController = require('../api/controllers/ItemController');
const phoneController = require('../api/controllers/PhoneController');

router.get('/compare', phoneController.compare);
router.get('/brand', phoneController.brand);
router.get('/brand/name', phoneController.brandName);
router.get('/:slug', itemController.detailItem);
router.get('/', phoneController.home);
module.exports = router;
