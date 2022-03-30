const express = require("express");
const router = express.Router();
const itemController = require("../api/controllers/ItemController");
const accessoryController = require("../api/controllers/AccessoryController");

router.get("/:slug", itemController.detailItemAccessory);
router.post("/addcart", accessoryController.addCart);
router.post("/cart", accessoryController.checkout);
router.get("/totalproduct", accessoryController.totalproduct);
router.get("/info", accessoryController.info);
router.get("/", accessoryController.index);
module.exports = router;
