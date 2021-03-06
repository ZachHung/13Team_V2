const express = require('express');
const router = express.Router();
const search = require('../api/controllers/SearchController');

router.get('/info', search.info);
router.get('/brand', search.brand);
router.get('/brand/name', search.brandName);
router.get('/match', search.match);
router.get('/global', search.index);
router.get('/', search.purchaseSearch);

module.exports = router;
