const express = require("express");
const router = express.Router();
const itemController = require("../api/controllers/ItemController");
const PhoneController = require("../api/controllers/PhoneController");

router.get("/brand", PhoneController.brand);
router.get("/brand/name", PhoneController.brandName);
router.get("/:slug", itemController.detailItemAccessory);
router.get("/", PhoneController.home);

module.exports = router;
