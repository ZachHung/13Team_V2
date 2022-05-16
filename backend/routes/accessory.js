const express = require("express");
const router = express.Router();
const itemController = require("../api/controllers/ItemController");
const PhoneController = require("../api/controllers/PhoneController");

<<<<<<< HEAD
router.get("/brand", PhoneController.brand);
router.get("/brand/name", PhoneController.brandName);
router.get("/:slug", itemController.detailItemAccessory);
router.get("/", PhoneController.home);
=======
router.get('/brand/name', PhoneController.brandName);
router.get('/brand', PhoneController.brand);
router.get('/:slug', itemController.detailItemAccessory);

router.get('/', PhoneController.home);
>>>>>>> b380853f2a6a879601248aae97bde25cf0cf796d

module.exports = router;
